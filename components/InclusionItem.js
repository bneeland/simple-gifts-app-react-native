import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const InclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>From: {props.from}</Text>
        <Text>To: {props.to}</Text>
        <Text>ID: {props.id}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default InclusionItem;
