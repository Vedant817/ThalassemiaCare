import { StyleSheet, Pressable, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user]);

  // Animation shared values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);
  const iconScale = useSharedValue(0.5);

  // Trigger animations on component mount
  useEffect(() => {
    if (!user) {
      titleOpacity.value = withDelay(200, withSpring(1));
      titleTranslateY.value = withDelay(200, withSpring(0));

      subtitleOpacity.value = withDelay(400, withSpring(1));
      subtitleTranslateY.value = withDelay(400, withSpring(0));

      buttonOpacity.value = withDelay(600, withSpring(1));
      buttonTranslateY.value = withDelay(600, withSpring(0));

      iconScale.value = withDelay(0, withSpring(1, { damping: 12, stiffness: 100 }));
    }
  }, [user]);

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const handleGetStarted = () => {
    router.push('/sign');
  };

  if (user) {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#E0F7FA', '#E1F5FE', '#F1F8E9']}
        style={styles.gradientBackground}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Animated.View style={iconAnimatedStyle}>
            <Ionicons name="medical-outline" size={80} color="#B91C1C" />
          </Animated.View>
          <ThemedText type="title" style={styles.headerText}>
            ThalassemiaCare
          </ThemedText>
        </View>

        <View style={styles.mainContent}>
          <Animated.View style={titleAnimatedStyle}>
            <ThemedText type="title" style={styles.title}>
              Welcome to a Community of Hope
            </ThemedText>
          </Animated.View>
          <Animated.View style={subtitleAnimatedStyle}>
            <ThemedText style={styles.subtitle}>
              Connecting thalassemia patients with voluntary blood donors, providing support and saving lives.
            </ThemedText>
          </Animated.View>
        </View>

        <Animated.View style={[styles.footer, buttonAnimatedStyle]}>
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [
              styles.getStartedButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <ThemedText style={styles.getStartedButtonText}>
              Get Started <Ionicons name="arrow-forward-circle" size={20} color="white" />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  headerText: {
    color: '#1F2937',
    marginTop: 16,
    fontWeight: 'bold',
  },
  mainContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    color: '#B91C1C',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#4B5563',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B91C1C',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
  },
  getStartedButtonText: {
    backgroundColor: '#B91C1C',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
