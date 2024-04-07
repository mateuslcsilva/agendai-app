import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase("agendai.db", '', '', undefined, (db) => console.log('abriu db krl', db._name));

export function createTables() {
    console.log('antes de criar tabela')
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS user (id, name, phone, email, password)', [], (tx) => console.log(tx));

    }, function(error) {
        console.log('Falha ao CRIAR tabelas: ' + error.message);
    });
    console.log('depois de criar tabela')
} 

export const insertDB = async (table: string, objDados :any) => {
    if(!table || !objDados) return false;
    let result;
    let columns = '';
    let values = '';

    for (const key in objDados) {
        columns += key + ',';
        values += [undefined, null, ''].includes(objDados[key]) ? 'NULL,' : `'${objDados[key]}',`;
    }

    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `insert into ${table} (${columns.substring(0, (columns.length - 1))}) values (${values.substring(0, (values.length - 1))})`, [],
        )
    });
    return result;
}

export const deleteAll = async (table: string) => {
    let result;
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `delete from ${table} where true = true`, []
        )
    });
    return result;
}

export const deleteWhere = async (table: string, whereObj :any) => {
    let result;
    let where = 'where ';

    for (const key in whereObj) {
        where += (`${key} = '${whereObj[key]}' and `)
    }
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `delete from ${table} ${where.substring(0, where.length - (' and '.length))}`, []
        )
    });
    return result;
}

export const selectAll = async (table: string, columns : Array<string> | null = null) => {
    let result : SQLite.ResultSet | undefined;
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `select ${columns == null ? '*' : columns.join(',')} from ${table}`, []
        )
    });
    return result && result.rows;
}

export const selectFirst = async (table: string, columns : Array<string> | null = null) => {
    console.log( `select ${columns == null ? '*' : columns.join(',')} from ${table} limit 1`)
    let result : SQLite.ResultSet | undefined;
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `select ${columns == null ? '*' : columns.join(',')} from ${table} limit 1`, []
        )
    });
    console.log('result')
    return result && result.rows[0];
}

export const selectWhere = async (table: string, whereObj :any, first : boolean = false, columns : Array<string> | null = null) => {
    let result : SQLite.ResultSet | undefined;
    let where = 'where ';

    for (const key in whereObj) {
        where += (`${key} = '${whereObj[key]}' and `)
    }


    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `select ${columns == null ? '*' : columns.join(',')} from ${table} ${where.substring(0, where.length - (' and '.length))} ${first == true ? 'limit 1' : ''}`, []
        )
    });
    return result && (first && Array.isArray(result.rows) ? result.rows[0] : result.rows);
}

export const selectCount = async (table: string, whereObj : Array<string> | null = null) => {
    let result : SQLite.ResultSet | undefined;
    let where = null;
    if(whereObj != null){
        where = 'where ';
    
        for (const key in whereObj) {
            where += (`${key} = '${whereObj[key]}' and `)
        }
    }

    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
            `select count(codigo) as qtde_registros from ${table} ${where != null ? where.substring(0, where.length - (' and '.length)) : ''}`, []
        )
    });
    return result && result.rows[0];
}

export const updateWhere = async (table: string, dataObj :any, whereObj :any) => {
    let where = 'where ';
    let set = 'set ';

    for (const key in whereObj) {
        where += (`${key} = '${whereObj[key]}' and `)
    }

    for (const key in dataObj) {
        set += (`${key} = '${dataObj[key]}',`)
    }

    await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync(
            `update ${table} ${set.substring(0, set.length - 1)} ${where.substring(0, where.length - (' and '.length))}`, []
        )
    });
    return selectWhere(table, dataObj);
}

export const executa = async (sql: string) => {
    let result : SQLite.ResultSet | undefined;
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync(
           sql, []
        )
    });
    return result && result.rows;
}

export const addColumn = async (tabela: string, coluna: string) => {
    let result : SQLite.ResultSet | undefined;
    await db.transactionAsync(async (tx) => {
        result = await tx.executeSqlAsync('SELECT instr(sql, ", ' + coluna + '") as existe FROM sqlite_master where name = "' + tabela + '" and existe = 0 ', [])
    });
    if(result && result?.rows?.length > 0){
        db.transaction(function(tx){
            tx.executeSql('ALTER TABLE ' + tabela + ' ADD COLUMN ' + coluna );
        })
    } 
}