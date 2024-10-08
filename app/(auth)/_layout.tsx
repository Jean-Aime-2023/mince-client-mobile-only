import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const _layout = () => {
  return (
    <>
     <Stack>
      <Stack.Screen
       name='login'
       options={{
        headerShown: false
       }}
      />
      <Stack.Screen
       name='register'
       options={{
        headerShown: false
       }}
      />
     </Stack>
     <StatusBar backgroundColor='transparent' style='dark' />
    </>
  )
}

export default _layout