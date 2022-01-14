import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const AssignConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Ready to assign people and send emails out to everyone?</Text>
        <Button title="Yes, assign people and send emails now" onPress={props.onConfirm} />
        <Button title="No, go back" onPress={props.onCancel} />
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

export default AssignConfirm;
