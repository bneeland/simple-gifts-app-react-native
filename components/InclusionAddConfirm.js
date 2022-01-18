import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const InclusionAddConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Are you sure you want to create this rule?</Text>
        <Button title="Confirm" onPress={props.onConfirm} />
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

export default InclusionAddConfirm;
