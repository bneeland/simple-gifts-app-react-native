import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const InclusionAddConfirm = props => {

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.heading}>Are you sure you want to create this rule?</Text>
        <Pressable style={styles.buttonBox} onPress={props.onConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Pressable>
        <Pressable style={styles.buttonBox} onPress={props.onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkButtonBackground,
    borderRadius: 150,
    padding: 10,
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.darkButtonText,
  },
});

export default InclusionAddConfirm;
