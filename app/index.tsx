import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SayProps {
  text: string;
}

interface SpellProps {
  ch: string;
}

const App: React.FC = (): ReactElement => {
  return (
    <SafeAreaView style={styles.screen}>
    <Say text="Hello React World!" />
    </SafeAreaView>
  );
};

const Say: React.FC<SayProps> = ({ text }): ReactElement => {
  return (
    // .Say-rows megfelelője
    <View style={styles.sayRows}>
    {text.split('').map((c, i) => (
      <Spell key={i} ch={c} />
    ))}
    </View>
  );
};

const Spell: React.FC<SpellProps> = ({ ch }): ReactElement => {
  // Animálható értékek: méret és egy index a színváltáshoz
  const animSize = useRef(new Animated.Value(50)).current;
  const animColor = useRef(new Animated.Value(0)).current;

  const [colorIndex, setColorIndex] = useState(0);
  const [nextColorIndex, setNextColorIndex] = useState(1);

  const colors = ["yellow", "aqua", "red", "green", "lightgreen", "pink", "bisque", "lightgrey", "black"];

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSize = Math.max(30, Math.round(Math.random() * 100));
      const newNextColorIndex = Math.floor(Math.random() * colors.length);

      // Párhuzamos animáció indítása (méret és színátmenet)
      Animated.parallel([
        Animated.timing(animSize, {
          toValue: nextSize,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.sequence([
          // Visszaállítjuk 0-ra, majd elindítjuk 1-ig a színátmenetet
          Animated.timing(animColor, { toValue: 0, duration: 0, useNativeDriver: false }),
                          Animated.timing(animColor, { toValue: 1, duration: 800, useNativeDriver: false })
        ])
      ]).start(() => {
        // Miután lefutott, a jelenlegi szín lesz az alap
        setColorIndex(newNextColorIndex);
      });

      setNextColorIndex(newNextColorIndex);
    }, 1000);

    return () => clearInterval(timer);
  }, [colorIndex]);

  // Szín interpoláció: a 0-1 értéket lefordítjuk színkódokra
  const interpolatedColor = animColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors[colorIndex], colors[nextColorIndex]]
  });

  const animatedBoxStyle = {
    backgroundColor: interpolatedColor,
    width: animSize,
    height: animSize,
  };

  const animatedTextStyle: Animated.AnimatedProps<TextStyle> = {
    fontSize: Animated.multiply(animSize, 0.6),
  };

  return (
    <Animated.View style={[styles.spellContainer, animatedBoxStyle]}>
    <Animated.Text style={[styles.spellText, animatedTextStyle]}>
    {ch}
    </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  sayRows: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spellContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },

  spellText: {
    color: 'blue',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default App;
