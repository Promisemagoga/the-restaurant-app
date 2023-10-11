import React, { useEffect, useState } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cart from './Pages/Cart'


const Stack = createNativeStackNavigator()
function StackNavigator() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await AsyncStorage.getItem('user')
            console.log("check if logged in", isAuthenticated);
            setIsAuth(isAuthenticated)
        }
        checkAuthentication()
    }, [])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>

                {
                    isAuth ? (
                        <>
                            <Stack.Screen name='home'  >
                                {() => <Home setIsAuth={setIsAuth} />}
                            </Stack.Screen>
                            <Stack.Screen name='user' component={UserPage} />
                            <Stack.Screen name='cat1' component={BurgerCat} />
                            <Stack.Screen name='cat2' component={SharingMeals} />
                            <Stack.Screen name='cat3' component={Bevarages} />
                            <Stack.Screen name='cat4' component={Desert} />
                            <Stack.Screen name='cat5' component={Sides} />
                            <Stack.Screen name='cat6' component={KidsMeals} />
                            <Stack.Screen name='cart' component={Cart} />

                        </>
                    ) : (
                        <>
                            <Stack.Screen name='welcome' component={Welcome} />
                            <Stack.Screen name='SignIn' >
                            {() => <SignIn setIsAuth={setIsAuth} />}
                            </Stack.Screen>
                            <Stack.Screen name='SignUp' component={SignUp} setIsAuth={setIsAuth}/>
                            <Stack.Screen name='profile'>
                            {() => <UserProfile setIsAuth={setIsAuth} />}
                            </Stack.Screen>

                        </>
                    )
                }

            </Stack.Group>

        </Stack.Navigator>
    )
}

export default StackNavigator