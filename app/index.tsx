import React, { useState, useEffect, ReactElement } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ViewStyle, TextStyle } from 'react-native';

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
  const [color, setColor] = useState<string>("white");
  const [width, setWidth] = useState<number>(50);
  const [height, setHeight] = useState<number>(50);

  useEffect(() => {
    const colors: string[] = ["yellow", "aqua", "red", "green", "lightgreen", "pink", "bisque", "lightgrey", "black"];
    const timer = setInterval(() => {
      setColor(colors[Math.floor(Math.random() * colors.length)]);
      setWidth(Math.max(30, Math.round(Math.random() * 100)));
      setHeight(Math.max(30, Math.round(Math.random() * 100)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dynamicBoxStyle: ViewStyle = {
    backgroundColor: color,
    width: width,
    height: height,
  };

  return (
    <View style={[styles.spellContainer, dynamicBoxStyle]}>
    <Text style={styles.spellText}>{ch}</Text>
    </View>
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
