import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { View, Text, StyleSheet, Animated, ViewStyle, TextStyle } from 'react-native';

interface SayProps {
  text: string;
}

interface SpellProps {
  ch: string;
}

const App: React.FC = (): ReactElement => {
  return (
    <View style={styles.screen}>
    <Say text="Hello React World!" />
    </View>
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
  const [color, setColor] = useState<string>("white");

  // Animálható értékek inicializálása (useRef, hogy megmaradjanak rendereléskor)
  const animSize = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const colors: string[] = ["yellow", "aqua", "red", "green", "lightgreen", "pink", "bisque", "lightgrey", "black"];

    const timer = setInterval(() => {
      const nextSize = Math.max(30, Math.round(Math.random() * 100));
      const nextColor = colors[Math.floor(Math.random() * colors.length)];

      // Animáció indítása: méret és szín folyamatos átmenete
      Animated.timing(animSize, {
        toValue: nextSize,
        duration: 800, // 0.8 másodperc alatt úszik át
        useNativeDriver: false, // Mérethez false szükséges
      }).start();

      setColor(nextColor);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animált stílusok összerakása
  const animatedBoxStyle = {
    backgroundColor: color, // A színváltás alapértelmezetten is lágy lesz a legtöbb View-n
    width: animSize,
    height: animSize,
  };

  const animatedTextStyle: Animated.AnimatedProps<TextStyle> = {
    // A betűméretet az animált magassághoz kötjük
    fontSize: Animated.multiply(animSize, 0.6),
  };

  return (
    // View helyett Animated.View kell az animáláshoz
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
