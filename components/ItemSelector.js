import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, KeyboardAvoidingView, Text, Button, TouchableOpacity } from "react-native";
import MultiSelect from 'react-native-multiple-select';


const ItemSelector = ({items, addWidgets}) => {

    const [selectedItems, setSelectedItems] = useState([]);
    const [itemsToReturn, setItemsToReturn] = useState([]);

    useEffect(() => {
        let all_items = []
        for (let i = 0; i < selectedItems.length; ++i){
            all_items.push(items[selectedItems[i]])
        }
        setItemsToReturn(all_items)
      }, [selectedItems]);


    return (
        <View>
            <MultiSelect
                items={items}
                single={false}
                uniqueKey="id"
                displayKey="name"
                onSelectedItemsChange={setSelectedItems}
                selectedItems={selectedItems}
                fixedHeight={true}
                itemFontSize={24}
                hideSubmitButton={true}
                noItemsText="No results yet!"
                selectText="Click to Browse Results"

            />
            <TouchableOpacity
            style={styles.button}
            onPress={() => addWidgets(itemsToReturn)}
          >
            {
                selectedItems.length == 0 ? 
                <Text style={styles.buttonText}>Close</Text> : 
                 selectedItems.length == 1 ? 
                    <Text style={styles.buttonText}>Add 1 Widget</Text> : 
                    <Text style={styles.buttonText}>Add {selectedItems.length} Widgets</Text>
                
            }
            
          </TouchableOpacity>


        </View>
    )


};

export default ItemSelector;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      // justifyContent: "center",
      backgroundColor: "white",
    },
  
    button: {
      width: 200,
      marginTop: 50,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#1DB954',
      margin: 10,
      height: 65,
      width: 350,
      borderRadius: 10,
      marginTop: 50,
    },
    buttonText: {
      fontSize: 24,
      marginTop: 15,
      color: '#FFFFFF',
    },
  });