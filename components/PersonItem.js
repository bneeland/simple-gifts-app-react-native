import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const PersonItem = props => {
  return (
      <View>
        <Text>{props.name}</Text>
        <Text>{props.email}</Text>
        {
          (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
            <Button title="Delete" onPress={props.onDelete.bind(this, props.id)} />
          ) : null
        }
        {
          (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
            <Button title="Must give to..." onPress={props.onStartInclusion.bind(this, props.id)} />
          ) : null
        }
        {
          (props.isAddInclusionMode && props.currentInclusion != props.id) ? (
            <Button title="...this person" onPress={props.onStopInclusion.bind(this, props.id)} />
          ) : null
        }
        {
          (!props.isAddExclusionMode && !props.isAddInclusionMode) ? (
            <Button title="Must not give to..." onPress={props.onStartExclusion.bind(this, props.id)} />
          ) : null
        }
        {
          (props.isAddExclusionMode && props.currentExclusion != props.id) ? (
            <Button title="...this person" onPress={props.onStopExclusion.bind(this, props.id)} />
          ) : null
        }
      </View>
  );
};

const styles = StyleSheet.create({
});

export default PersonItem;
