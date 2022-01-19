import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Pressable, TextInput } from 'react-native';

import Colors from '../constants/Colors';

const PersonAddInput = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');

  const nameInputHandler = (enteredValue) => {
    setEnteredName(enteredValue)
  }
  const emailInputHandler = (enteredValue) => {
    setEnteredEmail(enteredValue)
  }

  const addPersonHandler = () => {
    props.onAddPerson(enteredName, enteredEmail);
    setEnteredName('');
    setEnteredEmail('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.heading}>Person input</Text>
        <TextInput
          placeholder="Name"
          onChangeText={nameInputHandler}
          name={enteredName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          onChangeText={emailInputHandler}
          name={enteredEmail}
          style={styles.input}
        />
        <Pressable style={styles.buttonBox} onPress={addPersonHandler}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable style={styles.buttonBox} onPress={props.onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  input: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkButtonBackground,
    borderRadius: 150,
    padding: 10,
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.darkButtonText,
  },
});

export default PersonAddInput;
