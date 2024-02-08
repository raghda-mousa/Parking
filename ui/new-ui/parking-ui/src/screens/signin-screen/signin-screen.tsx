import React from "react";
import { useSignin } from "./use-signin"
import { ImageBackground, Text, View } from "react-native";
import { TextInput, Button } from '../../components'
import { MaterialCommunityIcons } from '../../assets/icons'

const SigninScreen = () => {
    const { classes, backgroundImage, email, setEmail, password, setPassword, handleSignIn, handleForgotPassword } = useSignin();

    return (
        <ImageBackground source={backgroundImage} style={classes.backgroundImage}>
            <View style={classes.container}>
                <Text style={classes.title}>Sign In</Text>
                <View style={classes.inputContainer}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="black" style={classes.icon} />
                    <TextInput
                        autoCapitalize='none'
                        style={classes.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={classes.inputContainer}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="black" style={classes.icon} />
                    <TextInput
                        style={classes.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                </View>
                <Button title="Sign In" onPress={handleSignIn} />
                <Button title="Forgot Password?" onPress={handleForgotPassword} />
            </View>
        </ImageBackground>
    )
}

export { SigninScreen }