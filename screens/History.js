import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import db from '../config';

export default class History extends Component{
  constructor(){
    super();
    this.state = {
      searchText: '',
      allData: []
    }
  }
  componentDidMount= async ()=>{
    this.getData();
  }
  getData = () =>{
    const {allData}= this.state;
    db.collection('books')
    .get()
    .then(snapshot=>{
      snapshot.docs.map(doc =>{
        this.setState({
          allData:[...this.state.allData, doc.data()]
          });
      });
    })
    .catch(error =>{
      console.error("Error loading document", error)
    })
  };
  
  render(){
    const {searchText, allData} = this.state
      return (
        <View style = {{backgroundColor: 'wheat', flex: 1}}>
          <TextInput
            style = {styles.inputBox}
            placeholder = {"Search"}
            onChangeText ={(text)=>{
              this.setState({ searchText: text })
            }}
          />
          <FlatList 
            data = {this.state.allData}
            renderItem = {({item})=>(
              <TouchableOpacity style = {styles.container}
                onPress={()=>
                  this.props.navigation.navigate("Info")
                }>
                {<Text style = {styles.textStyle}>{item.book_name} </Text>}
              </TouchableOpacity>
            )}
            keyExtractor={(item, index)=>{index.toString()}}
          />
        </View>
      );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: 'white',
    height: 40,
    width: '88%',
    borderWidth: 2.5,
    margin: 20,
    marginTop: 20,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
  container: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 15,
    height: 38,
    borderRadius: 15,
    justifyContent: 'center',
    width: '90%',
    marginLeft: '5%',
    borderWidth: 1

  },
  textStyle: {
    fontSize: 20,
    fontWeight: 500
  }
})