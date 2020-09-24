import React, {Component} from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import Scraps from "./Scraps";

export default class Jar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
      scraps: []
    };

    this.addItem = this.addItem.bind(this);
    this.selectScrap = this.selectScrap.bind(this);
  }

  addItem(e) {
    if(this.state.currentInput !== ''){
      console.log(this.state.currentInput);
      var newItem = {
        text: this.state.currentInput,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          scraps: prevState.scraps.concat(newItem)
        };
      });
      this.setState({currentInput: ''});
    }
    console.log(this.state.scraps);
    e.preventDefault();
  }

  selectScrap(e) {
    if(this.state.scraps.length !== 0){
      var randomScrap = this.state.scraps[Math.floor(Math.random() * this.state.scraps.length)];
      return <Modal animationType="fade"></Modal>
    }
  }

  render(){
    return (
      <View style={styles.container}>

       <View style={styles.header}>
          <TextInput placeholder="Write a scrap for this jar!" onChangeText={(a) => this.setState({currentInput: a})} value={this.state.currentInput} style={styles.input}/>
          <TouchableOpacity onPress={this.addItem} style={styles.add}>
            <Text> + </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerStacked}>
        <Text style={styles.title}> Jar Name </Text>
        <TouchableOpacity onPress={this.selectScrap} style={styles.random}>
          <Text> Select A Scrap </Text>
        </TouchableOpacity>
        </View>

        <Scraps entries={this.state.scraps}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    paddingLeft: 7,
    paddingRight: 7,
    marginRight: 10,
    height: 30,
    borderRadius: 5,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStacked: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 29,
    width: 25,
    borderRadius: 5,
    backgroundColor: '#66ccff',
  },
  random: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 25,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#66ccff'
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  }
});
