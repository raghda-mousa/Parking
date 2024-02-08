import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();

  const navigateToSecondScreen = () => {
    navigation.navigate('Result', { inputValue });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput placeholder="Enter a value"  value={inputValue}   onChangeText={(text) => setInputValue(text)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, width: 200 }}
      />
      <Button title="Go to Result Screen" onPress={navigateToSecondScreen} />
    </View>
  );
};

export default FirstScreen;
