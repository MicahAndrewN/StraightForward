import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";

// adapted from https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639

function loginHandler(navigation, username, password) {
    fetch('http://127.0.0.1:5000/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username,
            // 'password': password,
        })
    }).then(() => {
        navigation.navigate('Customize',
            {
                screen: 'Home',
                params: {}
            })
    }).catch((error) => {
        console.error(error);
        setdata("error with connecting to api")
    });
}

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.container}>
            <View><Text style={{ fontSize: 24, marginTop: 100 }}>StraightForward</Text></View>
            <View style={styles.login}>

                <StatusBar style="auto" />
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => setUsername(username)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => loginHandler(navigation, username, password)}>
                    <Text>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#DDD",
        width: "90%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: 250,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});
