import React from 'react';
import { StyleSheet, Modal, View, Text, Button } from 'react-native';

const PersonInput = props => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text>Person input</Text>
        <Button title="Cancel" onPress={props.onCancel} />
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonInput;
