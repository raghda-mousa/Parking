import React from "react"
import { ImageBackground, TextInput, Button } from "../../components"
import { Text, View } from "react-native"
import { FontAwesomeIcon } from "../../assets/icons"
import { useSignup } from "./use-signup"

const SignupScreen = () => {
    const { classes, name, setName, email, setEmail, password, setPassword, handleSubmit, backgroundImage } = useSignup();
    return (
        <ImageBackground source={backgroundImage} style={classes.backgroundImage}>
            <View style={classes.container}>
                <View style={classes.inputContainer}>
                    <FontAwesomeIcon name="user" size={20} color="grey" style={classes.icon} />
                    <TextInput
                        style={classes.input}
                        autoCapitalize='none'
                        placeholder="Name"
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholderTextColor="grey"
                    />
                </View>

                <View style={classes.inputContainer}>
                    <FontAwesomeIcon name="envelope" size={20} color="grey" style={classes.icon} />
                    <TextInput
                        style={classes.input}
                        autoCapitalize='none'
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholderTextColor="grey"
                    />
                </View>

                <View style={classes.inputContainer}>
                    <FontAwesomeIcon name="lock" size={20} color="grey" style={classes.icon} />
                    <TextInput
                        style={classes.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholderTextColor="grey"
                    />
                </View>

                <Button title="Sign Up" onPress={handleSubmit} />
            </View>
        </ImageBackground>
    )
}

export { SignupScreen }