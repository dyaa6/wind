// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from './components/Colors';
import Home from './screens/home';
import About from './screens/about';
import { StatusBar } from 'react-native';

// Inside your component

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
<StatusBar backgroundColor={Colors.mainColor} barStyle="light-content" />
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'الرئيسية') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'عن المشروع') {
        iconName = focused ? 'information-circle' : 'information-circle-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "#fff",
    tabBarInactiveTintColor: '#cecece',
    tabBarInactiveBackgroundColor:Colors.mainColor,
    tabBarActiveBackgroundColor:Colors.mainColor
  })}
>

        <Tab.Screen
          name="الرئيسية"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: Colors.mainColor,
              borderBottomEndRadius: 20,
              borderBottomStartRadius:20
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Tab.Screen
          name="عن المشروع"
          component={About}
          options={{
            headerStyle: {
              backgroundColor: Colors.mainColor,
              borderBottomEndRadius: 20,
              borderBottomStartRadius:20
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
