import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen 
          options={{ headerShown: false }} 
          name="Home" 
          component={TabNavigator} />
        ) : (
          <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{ headerShown: true, title: "Iniciar sesión" }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
