import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const PersonItem = props => {
  return (
    <View style={styles.personItemContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>{props.name}</Text>
        <Text style={styles.paragraph}>{props.email}</Text>
        <View style={styles.ruleButtonsContainer}>
          {
            (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
              <View style={styles.ruleButtonContainer}>
                <Pressable style={[styles.buttonBox, styles.buttonLeft]} onPress={props.onStartInclusion.bind(this, props.id)}>
                  <Text style={styles.buttonText}>✓ Must give to…</Text>
                </Pressable>
              </View>
            ) : null
          }
          {
            (props.isAddInclusionMode) ? (
              <View style={styles.ruleButtonContainer}>
                <Pressable style={props.currentInclusion != props.id ? styles.buttonBox : styles.buttonBoxDisabled} disabled={props.currentInclusion != props.id ? false : true} onPress={props.onStopInclusion.bind(this, props.id)}>
                  <Text style={props.currentInclusion != props.id ? styles.buttonText : styles.buttonTextDisabled}>Select</Text>
                </Pressable>
              </View>
            ) : null
          }
          {
            (!props.isAddExclusionMode && !props.isAddInclusionMode) ? (
              <View style={styles.ruleButtonContainer}>
                <Pressable style={[styles.buttonBox, styles.buttonRight]} onPress={props.onStartExclusion.bind(this, props.id)}>
                  <Text style={styles.buttonText}>✗ Mustn't give to…</Text>
                </Pressable>
              </View>
            ) : null
          }
          {
            (props.isAddExclusionMode) ? (
              <View style={styles.ruleButtonContainer}>
                <Pressable style={props.currentExclusion != props.id ? styles.buttonBox : styles.buttonBoxDisabled} disabled={props.currentExclusion != props.id ? false : true} onPress={props.onStopExclusion.bind(this, props.id)}>
                  <Text style={props.currentExclusion != props.id ? styles.buttonText : styles.buttonTextDisabled}>Select</Text>
                </Pressable>
              </View>
            ) : null
          }
        </View>
      </View>
      <View style={styles.deleteContainer}>
        {
          (!props.isAddInclusionMode && !props.isAddExclusionMode) ? (
            <Pressable style={[styles.buttonBox, styles.deleteButtonBox]} onPress={props.onDelete.bind(this, props.id)}>
              <Text style={[styles.buttonText, styles.deleteButtonText]}>✕</Text>
            </Pressable>
          ) : null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  personItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 5,
  },
  deleteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    backgroundColor: Colors.lightButtonBackground,
    borderRadius: 150,
    padding: 10,
  },
  buttonBoxDisabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.disabledButtonBackground,
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.lightButtonText,
  },
  buttonTextDisabled: {
    color: Colors.disabledButtonText,
  },
  deleteButtonBox: {
    width: 30,
    height: 30,
    backgroundColor: Colors.warningButtonBackground
  },
  deleteButtonText: {
    color: Colors.warningButtonText,
    fontSize: 12,
    lineHeight: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 8,
  },
  buttonLeft: {
    marginRight: 4,
  },
  buttonRight: {
    marginLeft: 4,
  },
});

export default PersonItem;
