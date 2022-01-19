import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Pressable } from 'react-native';

const InclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>{props.from} must give to {props.to}</Text>
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
    backgroundColor: 'dodgerblue',
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default InclusionItem;
