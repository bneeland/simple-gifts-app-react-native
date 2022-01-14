import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const PersonItem = props => {
  return (
    <TouchableNativeFeedback activeOpacity={0.5} onPress={props.onDelete.bind(this, props.id)}>
      <View>
        <Text>{props.name}</Text>
        <Text>{props.email}</Text>
        <Text>{props.id}</Text>
        <Button title="Delete" onPress={props.onDelete.bind(this, props.id)} />
        <Button title="Must give to..." onPress={props.onStartInclusion.bind(this, props.id)} />
        <Button title="Select for inclusion" onPress={props.onStopInclusion.bind(this, props.id)} />
        <Button title="Confirm inclusion" onPress={props.onConfirmInclusion} />
        <Button title="Cancel inclusion" onPress={props.onCancelInclusion} />
        <Button title="Must not give to..." onPress={props.onStartExclusion.bind(this, props.id)} />
        <Button title="Select for exclusion" onPress={props.onStopExclusion.bind(this, props.id)} />
        <Button title="Confirm exclusion" onPress={props.onConfirmExclusion} />
        <Button title="Cancel exclusion" onPress={props.onCancelExclusion} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({

});

export default PersonItem;
