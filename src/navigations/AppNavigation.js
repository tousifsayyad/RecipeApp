import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home/HomeScreen'
import SubCatScreen from '../screens/subCategories'
import RecipeScreen from '../screens/Recipe/RecipeScreen'
import SearchScreen from '../screens/Search/SearchScreen'
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen'

const Stack = createStackNavigator()

function MainNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#2cd18a',
                cardStyle: { backgroundColor: '#FFFFFF' },
                headerTitleStyle: {
                    fontWeight: '200',
                    textAlign: 'center',
                    alignSelf: 'center',
                    flex: 1,
                    color: '#2cd18a'
                }
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='SubCat' component={SubCatScreen} />
            <Stack.Screen name='Recipe' component={RecipeScreen} />
            <Stack.Screen name='Search' component={SearchScreen} />
            <Stack.Screen
                name='IngredientsDetails'
                component={IngredientsDetailsScreen}
            />
        </Stack.Navigator>
    )
}

export default function AppContainer() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
}

