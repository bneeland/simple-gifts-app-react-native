import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const InclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>{props.from} must give to {props.to}</Text>
        <Button title="Delete" onPress={props.onDelete.bind(this, props.id)} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default InclusionItem;
