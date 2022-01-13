import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const PersonInput = props => {
  const [enteredPerson, setEnteredPerson] = useState('');

  const personInputHandler = (enteredValue) => {
    setEnteredPerson(enteredValue)
  }

  const addPersonHandler = () => {
    props.onAddPerson(enteredPerson);
    setEnteredPerson('');
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Person input</Text>
        <TextInput
          placeholder="Person"
          onChangeText={personInputHandler}
          value={enteredPerson}
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
