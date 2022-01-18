import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Button } from 'react-native';

const PersonItem = props => {
  return (
      <View style={styles.personItemContainer}>
        <View style={styles.nameAndDeleteContainer}>
          <View style={styles.nameContainer}>
            <Text>{props.name}</Text>
          </View>
          <View style={styles.deleteContainer}>
            {
              (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
                <Button style={styles.deleteButton} title="×" onPress={props.onDelete.bind(this, props.id)} />
              ) : null
            }
          </View>
        </View>
        <Text>{props.email}</Text>
        <View style={styles.ruleButtonsContainer}>
          {
            (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
              <View style={styles.ruleButtonContainer}>
                <Button title="Must give to…" onPress={props.onStartInclusion.bind(this, props.id)} />
              </View>
            ) : null
          }
          {
            (props.isAddInclusionMode && props.currentInclusion != props.id) ? (
              <View style={styles.ruleButtonContainer}><Button title="Select" onPress={props.onStopInclusion.bind(this, props.id)} /></View>
            ) : null
          }
          {
            (!props.isAddExclusionMode && !props.isAddInclusionMode) ? (
              <View style={styles.ruleButtonContainer}><Button title="Mustn't give to…" onPress={props.onStartExclusion.bind(this, props.id)} /></View>
            ) : null
          }
          {
            (props.isAddExclusionMode && props.currentExclusion != props.id) ? (
              <View style={styles.ruleButtonContainer}><Button title="Select" onPress={props.onStopExclusion.bind(this, props.id)} /></View>
            ) : null
          }
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  personItemContainer: {
    flex: 1,
  },
  nameAndDeleteContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deleteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deleteButton: {
    width: 10,
  },
  emailContainer: {
    flex: 1,
  },
  ruleButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  ruleButtonContainer: {
    flex: 1,
  }
});

export default PersonItem;
