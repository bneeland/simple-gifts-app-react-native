import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const ExclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>{props.from} can't give to {props.to}</Text>
        <Button title="Delete" onPress={props.onDelete.bind(this, props.id)} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default ExclusionItem;
