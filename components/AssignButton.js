import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const AssignButton = props => {
  return (
    <View>
      <Button title="Assign people and send emails…" onPress={props.onAssign} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default AssignButton;
