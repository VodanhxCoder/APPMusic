import React from "react";
import { Tabs } from "expo-router";
import { Home, Search, Library, User } from "lucide-react-native";
import Colors from "@/constants/colors";
import MiniPlayer from "@/components/MiniPlayer";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.dark.background,
            borderTopColor: Colors.dark.cardAlt,
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: Colors.dark.primary,
          tabBarInactiveTintColor: Colors.dark.inactive,
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTintColor: Colors.dark.textSecondary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'left',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home size={24} color={color} />,
            headerTitle: "Musica",
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <Search size={24} color={color} />,
            headerTitle: "Search",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => <Library size={24} color={color} />,
            headerTitle: "Your Library",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <User size={24} color={color} />,
            headerTitle: "Profile",
          }}
        />
      </Tabs>
      <MiniPlayer />
    </>
  );
}