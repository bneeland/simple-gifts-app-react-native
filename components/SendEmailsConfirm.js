import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const SendEmailsConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Button title="Send emails now" />
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

export default SendEmailsConfirm;
