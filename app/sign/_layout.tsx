import { Stack } from 'expo-router';

export default function SignLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="signup" />
        </Stack>
    );
}