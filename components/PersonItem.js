import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PersonItem = props => {
  return (
    <View>
      <Text>{props.value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default PersonItem;
