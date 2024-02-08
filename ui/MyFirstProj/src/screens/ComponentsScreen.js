// raect component
import React from 'react';
import { Text,StyleSheet,View } from 'react-native';
const ComponentsScreen = () => {
    const greeting = 'Hi there!'; //jsx
    // const greeting2 = <Text>Hello to you!</Text>
    return(
     <View> 
        <Text style= {styles.textStyle}>This is the components Screen </Text> 
        <Text>{greeting}</Text>
        {/* { greeting2 } */}
     </View>
     );
};
const styles = StyleSheet.create({
 textStyle:{
    fontSize: 30
 }
});
export default ComponentsScreen;
