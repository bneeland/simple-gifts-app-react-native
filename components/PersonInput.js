import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';

const PersonInput = props => {
  return (
    <Modal visible={props.visible} animationType="slide">
      <View>
        <Text>Person input</Text>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({});

export default PersonInput;
