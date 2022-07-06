import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import db from '../config';

export default class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      book_name: '',
      author_name: '',
      motivation: '',
      finish_date: '',
      number_of_time: '',
      start_date: '',
      state: '',
    };
  }
  componentDidMount(){
   this.display("EAT THAT FROG");
  }
  display = async (docName)=>{
    const query = db.collection('books').doc(docName).get();
    query.then(doc =>{
      const data = doc.data();
      this.setState({
        book_name: data.book_name,
        author_name: data.author_name,
        motivation: data.motivation,
        finish_date: data.finish_date,
        number_of_time: data.number_of_time,
        start_date: data.start_date,
        state: data.state
      })
    })
  }
   render(){
     const {
      book_name,
      author_name,
      motivation, 
      finish_date, 
      number_of_time, 
      state, 
      start_date} = this.state;

     return(
       <View style = {styles.container}>
          <View style = {styles.textContainer}>
            <Text style = {{fontSize: 23}}> Book Name: {book_name} </Text>
            <Text style = {{fontSize: 23}}> Author Name: {author_name} </Text>
            <Text style = {{fontSize: 23}}> Start Date:  </Text>
            <Text style = {{fontSize: 23}}> Finish Date: {finish_date}</Text>
            <Text style = {{fontSize: 23}}> State: {state}</Text>
            <Text style = {{fontSize: 23}}> Number of times read: {number_of_time}</Text>
            <Text style = {{fontSize: 23}}> Motivation: {motivation}</Text>
          </View>
         <Button title = "helo" onPress = {()=>this.props.navigation.navigate("BottomTab")}/>
       </View>
     );
   }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'wheat',
    justifyContent: 'center',
    
  },
  textContainer: {
    textAlign: 'center',
    fontWeight: 500,
  }
})
