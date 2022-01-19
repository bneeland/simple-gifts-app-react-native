import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const ExclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>{props.from} can't give to {props.to}</Text>
        <Pressable style={styles.buttonBox} onPress={props.onDelete.bind(this, props.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.warningButtonBackground,
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.warningButtonText,
  },
});

export default ExclusionItem;
