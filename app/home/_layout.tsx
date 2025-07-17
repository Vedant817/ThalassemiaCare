import { Entypo, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveBackgroundColor: '#b91c1c',
            tabBarInactiveBackgroundColor: '#b91c1c',
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#fff'
        }}>
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }} />
                <Tabs.Screen 
                name="find-blood"
                options={{
                    title: "Find Blood",
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="drop" size={size} color={color} />
                    )
                }} />
                <Tabs.Screen 
                name="my-care"
                options={{
                    title: "My Care",
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name="health-and-safety" size={size} color={color} />
                    )
                }} />
                <Tabs.Screen 
                name="learn"
                options={{
                    title: "Learn",
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="book-education" size={size} color={color} />
                    )
                }} />
                <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color, size}) => (
                        <Fontisto name="male" size={size} color={color} />
                    )
                }} />
        </Tabs>
    )
}