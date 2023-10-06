import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './Pages/Home'
import Welcome from './Pages/Welcome'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UserProfile from './Pages/UserProfile'
import BurgerCat from './Pages/BurgerCat'
import SharingMeals from './Pages/SharingMeals'
import Bevarages from './Pages/Baverages'
import Desert from './Pages/Desert'
import Sides from './Pages/Sides'
import KidsMeals from './Pages/KidsMeals'
import UserPage from './Pages/UserPage'


const Stack = createNativeStackNavigator()
function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name='welcome' component={Welcome} />
                <Stack.Screen name='SignIn' component={SignIn} />
                <Stack.Screen name='SignUp' component={SignUp} />
                <Stack.Screen name='profile' component={UserProfile} />
                <Stack.Screen name='user' component={UserPage} />
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='cat1' component={BurgerCat} />
                <Stack.Screen name='cat2' component={SharingMeals} />
                <Stack.Screen name='cat3' component={Bevarages} />
                <Stack.Screen name='cat4' component={Desert} />
                <Stack.Screen name='cat5' component={Sides} />
                <Stack.Screen name='cat6' component={KidsMeals} />




            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator