import React from "react";
import { useMainScreen } from "./use-main-screen"
import { Image, Pressable, Text, View } from "react-native";

const MainScreen = () => {
    const { onSignin, onSignup, classes, signinImage } = useMainScreen();
    return (
        <View style={classes.container}>
            <View style={classes.header}>
                <Text style={classes.headerText}>Hello!</Text>
            </View>
            <Image style={classes.backgroundImage} source={signinImage} />
            <View style={classes.buttonContainer}>
                <Pressable style={classes.buttonSignin} onPress={onSignin}>
                    <Text style={classes.buttonTextSignin}>Sign In</Text>
                </Pressable>
                <Pressable style={classes.buttonSignup} onPress={onSignup}>
                    <Text style={classes.buttonTextSignup}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    )
}

export { MainScreen }