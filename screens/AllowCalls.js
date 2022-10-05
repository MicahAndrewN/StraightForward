import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const AllowCalls = ({navigation}) => {
    const [selected, setSelected] = useState({});
    const data = [
      "Mom", "Dad", "Daniel", "1", "2", "3"
    ];
  
    const check = (item) => {
      setSelected(test => (test[item] ? {...test, [item]: false} : {...test, [item]: true}));
    }
    const render = ({item}) => {
      return(
        <TouchableOpacity
            style={styles.button}
            onPress={() => check(item)}
          >
          {selected[item] ? <Text style={styles.text}>{item} &#10003;</Text> : <Text style={styles.text}>{item}</Text>}
        </TouchableOpacity>
      )
    }
  
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold'}}>Allow Calls</Text>
            <FlatList
            data={data}
            renderItem={render}
            keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate('Customize',
            {
                screen: 'MakeCalls',
                params: {}
            })}
            >
            <Text style={styles.text}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
  },
  button2: {
    textAlign: 'center',
    backgroundColor: '#DDDDDD',
    marginTop: 10,
    marginBottom: 10,
    height: 65,
    width: 250,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: 'bold'
  },
});

export default AllowCalls;