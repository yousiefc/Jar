import React, {} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';

  export default function SelectScrap(props){
    if(props.scraps.length !== 0) {
      var randomScrap = props.scraps[Math.floor(Math.random() * props.scraps.length)];
      console.log(randomScrap);
      
      return (
        <Modal visible={true} animationType="slide" style={styles.modal}>
          <View>
            <Text>
              The choice is:
            </Text>
            <Text>{randomScrap.text}</Text>
          </View>
        </Modal>
      );
    }
  }

  const styles = StyleSheet.create({
    modal: {
    minHeight: 70,
    left: 0,
    right: 0,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
    }
  });