import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

const PersonItem = props => {
  return (
    <TouchableNativeFeedback activeOpacity={0.5} onPress={props.onDelete.bind(this, props.id)}>
      <View>
        <Text>{props.name}</Text>
        <Text>{props.email}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default PersonItem;
