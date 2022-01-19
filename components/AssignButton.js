import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

const AssignButton = props => {
  return (
    <View>
      <Pressable style={styles.buttonBox} onPress={props.onAssign}>
        <Text style={styles.buttonText}>Finalize</Text>
      </Pressable>
    </View>
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

export default AssignButton;
