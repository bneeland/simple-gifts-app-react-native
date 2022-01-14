import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Button, TextInput } from 'react-native';

const ExclusionDeleteConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Button title="Delete" onPress={props.onDeleteConfirm.bind(this, props.exclusionToDelete)} />
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

export default ExclusionDeleteConfirm;
