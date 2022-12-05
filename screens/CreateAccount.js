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

const CreateAccount = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [blankField, setBlankField] = useState(false)
    const [buttonPressed, setButtonPressed] = useState(false);

    const auth = React.useContext(AuthContext);

    function createAccount() {
        if (username === "" || password === "") {
            setBlankField(true)
            return
        }
        else {
            setBlankField(false)
        }
        fetch('http://localhost:5000/account', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                // 'password': password,
            }),

        }).then((response) => {
            response = response.json();
            console.log(response)
            console.log("successfully created account ")

            auth.status = true;
            console.log(auth)
            auth.login(username, password)
        }).catch((error) => {
            console.error(error);
            setdata("error with connecting to api")
        });
    }

    return (
        <View style={styles.container}>
            <View><Text style={{ fontSize: 30, marginTop: 20, fontWeight: 'bold' }}>Create New Account</Text></View>
            <View style={styles.login}>

                {blankField ? <Text style={{fontSize: 15, color: 'red'}}>Username or Password cannot be blank</Text>: <></>}

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

                <TouchableOpacity 
                    style={styles.loginBtn}  
                    onPress={() => createAccount()}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    login: {
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#DDD",
        width: 230,
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        fontSize: 20,
        padding: 10,
        marginLeft: 20,
        width: 250,
        borderRadius: 10,
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
});
