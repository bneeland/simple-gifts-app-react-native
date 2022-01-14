import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const SendEmailsConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Ready?</Text>
        <Text>This will match the people in your list according to the rules you have created. Then, everyone will get an email with the name of the person they will give a gift to.</Text>
        <Button title="Yes, match people and send emails now" />
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

export default SendEmailsConfirm;
