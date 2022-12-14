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
import AuthContext from "../components/AuthContext";


// adapted from https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639



const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonPressed, setButtonPressed] = useState(false);

    const auth = React.useContext(AuthContext);

    function loginHandler(navigation, username, password) {
        console.log(auth)
        fetch('http://127.0.0.1:5000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                // 'password': password,
            }),
            mode: 'no-cors'

        }).then((response) => {
            response = response.json();
            console.log(response)
            console.log("successfully logged in (in login page) ")
            setButtonPressed(!buttonPressed)
            // navigation.navigate('Customize',
            //     {
            //         screen: 'CustomizeHome',
            //         params: {}
            //     })
            auth.status = true;
            console.log(auth)
        }).catch((error) => {
            console.error(error);
            setdata("error with connecting to api")
        });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/logotagline.png')} />
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
                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    loginHandler(navigation, username, password); auth.login(username, password); setButtonPressed(!buttonPressed)}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.createAccBtn} 
                    onPress={() => navigation.navigate('CreateAccount')
                    }
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>Create Account</Text>
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
        top: -50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        marginBottom: 0,
    },

    inputView: {
        backgroundColor: "#DDD",
        width: 250,
        height: 45,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        fontSize: 20,
        padding: 10,
        marginLeft: 20,
        width: 250,
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
        fontSize: 20,
        backgroundColor: "#4285F4",
    },
    createAccBtn: {
        width: 250,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        fontSize: 20,
        backgroundColor: "#4285F4",
    },
});
