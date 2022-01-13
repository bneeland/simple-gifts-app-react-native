import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

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
        <Text>Person input</Text>
        <TextInput
          placeholder="Name"
          onChangeText={nameInputHandler}
          name={enteredName}
        />
        <TextInput
          placeholder="Email"
          onChangeText={emailInputHandler}
          name={enteredEmail}
        />
        <Button title="Add" onPress={addPersonHandler} />
        <Button title="Cancel" onPress={props.onCancel} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});

export default PersonAddInput;
