// // AuthenticationScreen.js
// import React, { useState } from 'react';
// import { View, Text,Image,StyleSheet, TextInput, Button } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// const AuthenticationScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');

//   const handleSignIn = () => {
//     // Implement sign-in logic here
//     console.log('Signing in:', email, password);
//   };

//   const handleSignUp = () => {
//     return(
//     <View style={styles.container}>
//     <Text style={styles.label}>Full Name:</Text>
//     <TextInput
//       style={styles.input}
//       value={name}
//       onChangeText={setName}
//       placeholder="Enter Full Name"
//     />
//     <Text style={styles.label}>Email:</Text>
//     <TextInput
//       style={styles.input}
//       value={email}
//       onChangeText={setEmail}
//       placeholder="Enter your email"
//     />

//     <Text style={styles.label}>Password:</Text>
//     <TextInput
//       style={styles.input}
//       value={password}
//       onChangeText={setPassword}
//       secureTextEntry
//       placeholder="Enter your password"
//     />
//     <Text style={styles.label}>Confirm Password:</Text>
//     <TextInput
//       style={styles.input}
//       value={password}
//       onChangeText={setPassword}
//       secureTextEntry
//       placeholder="Confirm Password"
//     />

//     <Button title="Sign Up" onPress={console.log('Signing up:', name,email, password)} />
//     </View>   
//     );
//   };

//   return (
//     <View style={styles.Home} >
//      <Image
//         style={styles.tinyLogo}
//         source= {require('./assets/carParking.jpg')}
        
//       />
//       <Text style={styles.Home} >Email:</Text>
//       <TextInput style={styles.Home} 
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Enter your email"
//       />

//       <Text style={styles.Home} >Password:</Text>
//       <TextInput style={styles.Home} 
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         placeholder="Enter your password"
//       />
//         <Text></Text>
//          <Text></Text>
//          <Text></Text>
//          <Text></Text>
//          <Text></Text>
//       <Button style={styles.Btn} title="Sign In" onPress={handleSignIn} />
//       <Text></Text>
//       <Text></Text>
        
//       <Button style={styles.Btn} title="Sign Up" onPress={handleSignUp} />
//       <Text></Text>
//          <Text></Text>
//          <Text></Text>
//          <Text></Text>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//     Btn:{
//         borderColor:'#f0f8ff',
//         borderBlockColor:'#f0f8ff'
//     },
//     Home:{
//     //  alignItems: 'center',
//      marginTop:15,
//      margin: 10,
//      backgroundColor:'#8fbc8f',
     
//    },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 16,
//         // backgroundColor:'#8fbc8f',
//       },
//       label: {
//         fontSize: 16,
//         marginBottom: 8,
//       },
//       input: {
//         height: 40,
//         borderColor: 'gray',
//         backgroundColor:'#f0f8ff',
//         borderWidth: 1,
//         marginBottom: 16,
//         paddingHorizontal: 10,
//       },
//       tinyLogo: {
//         width: 380,
//         height: 200,},
    
// }) ;
// const AppNavigator = createStackNavigator(
//   {
//     Home: AuthenticationScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

// export default createAppContainer(AppNavigator);