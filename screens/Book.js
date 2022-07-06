import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class Books extends Component {
  constructor() {
    super();
    this.state = {
      bookName: '',
      authorName: '',
      why: '',
    };
  }
  checkBookAvailability = async (bookName) => {
    const check = await db
      .collection('books')
      .where('book_name', '==', bookName)
      .get();
    var availability = '';
    if (check.docs.length == 0) {
      availability = false;
    } else {
      availability = true;
    }
    return availability;
  };
  
  createDocument = async (bookName, authorName, why) => {
    const data = {
      book_name: bookName.toUpperCase().trim(),
      author_name: authorName,
      motivation: why,
      start_date: firebase.firestore.Timestamp.now().toDate(),
      finish_date: '',
      number_of_time: 1,
      state: "Reading"
    };
    var check = await this.checkBookAvailability(bookName.toUpperCase().trim());
    const docRef = db.collection('books').doc(bookName.toUpperCase().trim());
    if(check){
      docRef.update({
        number_of_time: firebase.firestore.FieldValue.increment(1),
        start_date: firebase.firestore.FieldValue.serverTimestamp(),
        finish_date: '',
        state: 'Rereading'
      })
    }else{
      if(bookName !== ''&& authorName!== '' && why !== ''){
        docRef.set(data);
      }
      else {
        Alert.alert("Please fill all boxes...")
      }
    }
  };

  render() {
    const { bookName, authorName, why } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.inputBox, { marginTop: 60 }]}
          placeholder={'Book Name'}
          onChangeText={(text) => {
            this.setState({ bookName: text });
          }}
          value={bookName}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'Author Name'}
          onChangeText={(text) => {
            this.setState({ authorName: text });
          }}
          value={authorName}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={'Motivation'}
          onChangeText={(text) => {
            this.setState({ why: text });
          }}
          value={why}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.createDocument(bookName, authorName, why);
            this.setState({ bookName: '', authorName: '', why: '' });
          }}>
          <Text style={styles.buttonText}> ADD </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'wheat',
  },
  inputBox: {
    backgroundColor: 'white',
    height: 50,
    width: '88%',
    flexDirection: 'row',
    borderWidth: 2.5,
    margin: 20,
    marginTop: 50,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
  button: {
    backgroundColor: 'rgb(100, 100, 100)',
    width: "34%",
    padding: 4.5,
    marginTop: 40,
    marginLeft: '33%',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    color: 'orange',
  },
});
