import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './Pages/Home'
import Welcome from './Pages/Welcome'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UserProfile from './Pages/UserProfile'


const Stack = createNativeStackNavigator()
function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name='welcome' component={Welcome} />
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='profile' component={UserProfile} />
                <Stack.Screen name='home' component={Home} />

            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator