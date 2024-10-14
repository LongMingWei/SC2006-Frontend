import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen,Stack } from 'expo-router'
import { useFonts  } from 'expo-font'


const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),

      "Jua-Regular": require("../assets/fonts/Jua-Regular.ttf"),
    });
  
    useEffect(() => {
      if (error) throw error;
  
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, error]);
  
    if (!fontsLoaded) {
      return null;
    }
  
    if (!fontsLoaded && !error) {
      return null;
    }
  return (
    <Stack>
      <Stack.Screen name="index"
      options={{headerShown: false}} />

    <Stack.Screen name='(auth)'
      options={{headerShown: false}} />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})