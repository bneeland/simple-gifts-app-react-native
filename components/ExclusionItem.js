import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const ExclusionItem = props => {
  return (
    <TouchableNativeFeedback>
      <View>
        <Text>From: {props.from}</Text>
        <Text>To: {props.to}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default ExclusionItem;
