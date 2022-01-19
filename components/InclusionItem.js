import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const InclusionItem = props => {
  return (
      <View style={styles.itemContainer}>
        <View style={styles.contentContainer}>
          <Text>{props.from} must give to {props.to}</Text>
        </View>
        <View style={styles.deleteContainer}>
          <Pressable style={[styles.buttonBox, styles.deleteButtonBox]} onPress={props.onDelete.bind(this, props.id)}>
            <Text style={[styles.buttonText, styles.deleteButtonText]}>✕</Text>
          </Pressable>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 5,
  },
  deleteContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.warningButtonBackground,
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.warningButtonText,
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
});

export default InclusionItem;
