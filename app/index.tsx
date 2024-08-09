import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function Index() {

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // position shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);


  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
    };
  }
  );

  return (
    <View
      style={styles.container}
    >
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
          rotate.value = withTiming(rotate.value - 90);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withTiming(rotate.value + 90);
        }}
       style={[styles.box, rStyle]} />
       <Pressable style={styles.btn} onPress={() => {
         cancelAnimation(translateX);
          cancelAnimation(translateY);
          translateX.value = withTiming(Math.random() * 200 - 100);
          translateY.value = withTiming(Math.random() * 200 - 100);
        }}>
       <MaterialCommunityIcons name="shuffle" size={28} color="black" />
       </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  box: {
    width: 120,
    height: 120,
    backgroundColor: '#6681d9',
    borderRadius: 20,
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
  },
})
