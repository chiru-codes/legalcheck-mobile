import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Welcome/WelcomeScreen';
import LoginScreen from '../screens/Auth/login/LoginScreen';
import RegisterScreen from '../screens/Auth/register/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import VerifyEmailScreen from '../screens/Auth/token/VerifyEmailScreen';
import RegisterLawyerScreen from '../screens/Auth/register/RegisterLawyerScreen';
import { useAuth } from '../hooks/useAuth';

const linking = {
    prefixes: ['legalcheck://'],
    config: {
        screens: {
            VerifyEmail: {
                path: 'verify',
                parse: {
                    token: (token: string) => `${token}`,
                },
            },
        },
    },
};

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isLogged } = useAuth();

    return (
        <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLogged ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="RegisterLawyer" component={RegisterLawyerScreen} />
                        <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
