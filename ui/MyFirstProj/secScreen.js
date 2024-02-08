import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SecScreen = () => {
  const route = useRoute();
  const { inputValue } = route.params || {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Value from First Screen:</Text>
      <Text>{inputValue}</Text>
    </View>
  );
};

export default SecScreen;

