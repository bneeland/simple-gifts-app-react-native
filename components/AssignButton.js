import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const AssignButton = props => {
  return (
    <View>
      <Button title="Finalize" onPress={props.onAssign} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AssignButton;
