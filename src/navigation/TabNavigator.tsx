import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ClientScreen from "../screens/wash/ClientScreen";
import ReportScreen from "../screens/wash/ReportScreen";
import ServicesScreen from "../screens/wash/ServicesScreen";
import WashedScreen from "../screens/wash/WashedScreen";
import { TouchableOpacity, View, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Logo  from "../../assets/images/LogoLaVirgen.png";

export type MainTabParamList = {
  Clientes: undefined;
  Reportes: undefined;
  Servicios: undefined;
  Lavadas: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function TabNavigator() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { height: 60 },
        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#999",
        headerRight: () => {
             return (
                <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
                    <MaterialCommunityIcons name="logout" size={24} color="#000" />
                </TouchableOpacity>
            );
          },
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            {user?.image ? (
              <Image
                source={{ uri: user.image }}
                style={logoStyle}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={Logo}
                style={logoStyle}
                resizeMode="contain"
              />
            )}
          </View>
        ),
        headerStyle: {
          height:100
        }
      }}
    >
      <Tab.Screen
        name="Clientes"
        component={ClientScreen}
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Reportes"
        component={ReportScreen}
        options={{
          title: "Reportes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Servicios"
        component={ServicesScreen}
        options={{
          title: "Servicios",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wrench" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Lavadas"
        component={WashedScreen}
        options={{
          title: "Lavadas",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-wash" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const logoStyle = {
   width: 60, 
   height: 60, 
   marginLeft: 15
}