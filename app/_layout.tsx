import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, TabRouter, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, }} />
        <Stack.Screen name="modal" options={{ title: 'Login', presentation: 'modal' }} />
        <Stack.Screen name="modalUserInfo" options={{ title: 'Minha conta', presentation: 'modal' }} />
        <Stack.Screen name="modalAppointmentForm" options={{ title: 'Novo formulário', presentation: 'modal', headerLeft: ({ tintColor }) => (
          <TouchableNativeFeedback onPress={() => router.replace('/appointmentForms')}>
            <AntDesign style={{ marginRight: 16, marginTop: 2 }} name="arrowleft" size={24} color={tintColor} />
          </TouchableNativeFeedback>
          ) }} />
      </Stack>
    </ThemeProvider>
  );
}
