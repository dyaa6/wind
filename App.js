import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';import { Feather } from '@expo/vector-icons';
import ContactUs from './screens/ContactUs';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Colors from './Components/Colors';
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              الرئيسية: 'home',
              الاعدادات: 'gear',
              اتصل_بنا: 'headphones',
            };

            return (
              <FontAwesome
                name={icons[route.name]}
                color={color}
                size={size}
              />
            );
          },
          
            "tabBarActiveTintColor": Colors.thirdColor,
            "tabBarStyle": [
              {
                "display": "flex",
                backgroundColor:Colors.mainColor
              },
              null
            ]
          
        })}
        
      >
        <Tab.Screen name="الرئيسية" component={Home} />
        <Tab.Screen name="الاعدادات" component={Settings} />
        <Tab.Screen name="اتصل_بنا" component={ContactUs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
