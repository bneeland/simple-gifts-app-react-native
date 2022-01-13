import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import PersonInput from './components/PersonInput';
import PersonItem from './components/PersonItem';

export default function App() {
  const [isAddMode, setIsAddMode] = useState(false);
  const [listedPeople, setListedPeople] = useState([]);

  const cancelPersonInputHandler = () => {
    setIsAddMode(false);
  };

  const addPersonHandler = personValue => {
    setListedPeople(currentPeople => [
      ...currentPeople,
      { id: Math.random().toString(), value: personValue }
    ]);
    setIsAddMode(false);
  }

  return (
    <View style={styles.container}>
      <Button title="Add person" onPress={() => setIsAddMode(true)}/>
      <PersonInput
        visible={isAddMode}
        onAddPerson={addPersonHandler}
        onCancel={cancelPersonInputHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={listedPeople}
        renderItem={itemData => (
          <PersonItem
            id={itemData.item.id}
            value={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});
