import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Pressable } from 'react-native';

const PersonItem = props => {
  return (
    <View style={styles.personItemContainer}>
      <View style={styles.nameAndDeleteContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.heading}>{props.name}</Text>
        </View>
        <View style={styles.deleteContainer}>
          {
            (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
              <Pressable style={[styles.buttonBox, styles.deleteButton]} onPress={props.onDelete.bind(this, props.id)}>
                <Text style={styles.buttonText}>×</Text>
              </Pressable>
            ) : null
          }
        </View>
      </View>
      <Text>{props.email}</Text>
      <View style={styles.ruleButtonsContainer}>
        {
          (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
            <View style={styles.ruleButtonContainer}>
              <Pressable style={styles.buttonBox} onPress={props.onStartInclusion.bind(this, props.id)}>
                <Text style={styles.buttonText}>Must give to…</Text>
              </Pressable>
            </View>
          ) : null
        }
        {
          (props.isAddInclusionMode) ? (
            <View style={styles.ruleButtonContainer}>
              <Pressable style={props.currentInclusion != props.id ? styles.buttonBox : styles.buttonBoxDisabled} disabled={props.currentInclusion != props.id ? false : true} onPress={props.onStopInclusion.bind(this, props.id)}>
                <Text style={styles.buttonText}>Select</Text>
              </Pressable>
            </View>
          ) : null
        }
        {
          (!props.isAddExclusionMode && !props.isAddInclusionMode) ? (
            <View style={styles.ruleButtonContainer}>
              <Pressable style={styles.buttonBox} onPress={props.onStartExclusion.bind(this, props.id)}>
                <Text style={styles.buttonText}>Mustn't give to…</Text>
              </Pressable>
            </View>
          ) : null
        }
        {
          (props.isAddExclusionMode) ? (
            <View style={styles.ruleButtonContainer}>
              <Pressable style={styles.buttonBox} disabled={props.currentExclusion != props.id ? false : true} onPress={props.onStopExclusion.bind(this, props.id)}>
                <Text style={styles.buttonText}>Select</Text>
              </Pressable>
            </View>
          ) : null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  personItemContainer: {
    flex: 1,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
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
  emailContainer: {
    flex: 1,
  },
  ruleButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  ruleButtonContainer: {
    flex: 1,
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
    borderRadius: 150,
    padding: 10,
  },
  buttonBoxDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightsteelblue',
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    width: 40,
    height: 40,
    fontSize: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PersonItem;
