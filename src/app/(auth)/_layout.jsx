import { View, Text, } from 'react-native'
import React from 'react'
import { Redirect, Stack } from "expo-router";

const Authlayout = () => {
  return (
    <>
      <Stack screenOptions={{headerShown: false,}}>
        <Stack.Screen
          name="loginscreen"
          options={{
            headerShown: false,
          }}
          
        />
        <Stack.Screen
          name="registerScreen"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createProfile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}

export default Authlayout