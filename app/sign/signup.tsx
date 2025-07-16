import { StyleSheet, Pressable, View, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen() {
  const { signUp, error, isLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animation shared values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);

  // Trigger animations on component mount
  useEffect(() => {
    titleOpacity.value = withDelay(200, withSpring(1));
    titleTranslateY.value = withDelay(200, withSpring(0));

    formOpacity.value = withDelay(400, withSpring(1));
    formTranslateY.value = withDelay(400, withSpring(0));

    buttonOpacity.value = withDelay(600, withSpring(1));
    buttonTranslateY.value = withDelay(600, withSpring(0));
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Sign Up Error', error);
    }
  }, [error]);

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const handleSignUp = () => {
    signUp({ fullName, email, password });
  };

  const handleSignIn = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#E0F7FA', '#E1F5FE', '#F1F8E9']}
        style={styles.gradientBackground}
      />
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.header, titleAnimatedStyle]}>
          <ThemedText type="title" style={styles.title}>
            Create Account
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Join our community to help save lives.
          </ThemedText>
        </Animated.View>

        <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#4B5563" style={styles.inputIcon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#4B5563" style={styles.inputIcon} />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#4B5563" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
          <Pressable
            onPress={handleSignUp}
            disabled={isLoading}
            style={({ pressed }) => [
              styles.signUpButton,
              (pressed || isLoading) && styles.buttonPressed,
            ]}
          >
            <ThemedText style={styles.signUpButtonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </ThemedText>
          </Pressable>
          <Pressable onPress={handleSignIn} style={styles.signInLink}>
            <ThemedText style={styles.signInLinkText}>
              Already have an account? <ThemedText style={styles.signInLinkTextBold}>Sign In</ThemedText>
            </ThemedText>
          </Pressable>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    color: '#1F2937',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#1F2937',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#B91C1C',
    borderRadius: 50,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#991B1B',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#B91C1C',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 50,
  },
  signInLink: {
    marginTop: 24,
  },
  signInLinkText: {
    color: '#4B5563',
    fontSize: 14,
  },
  signInLinkTextBold: {
    fontWeight: 'bold',
    color: '#B91C1C',
  },
});

