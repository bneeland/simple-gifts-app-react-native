import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const PersonInput = props => {
  const [enteredName, setEnteredName] = useState('');

  const nameInputHandler = (enteredValue) => {
    setEnteredName(enteredValue)
  }

  const addPersonHandler = () => {
    props.onAddPerson(enteredName);
    setEnteredName('');
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

export default PersonInput;
