import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import PersonItem from './components/PersonItem';
import PersonAddInput from './components/PersonAddInput';

export default function App() {
  const [isAddMode, setIsAddMode] = useState(false);

  const [listedPeople, setListedPeople] = useState([]);

  const cancelPersonAddHandler = () => {
    setIsAddMode(false);
  };

  const addPersonHandler = (personName, personEmail) => {
    setListedPeople(currentPeople => [
      ...currentPeople,
      { id: Math.random()*Math.pow(10,17).toString(), name: personName, email: personEmail }
    ]);
    setIsAddMode(false);
  };

  const deletePersonHandler = personId => {
    console.log(personId);
    console.log(listedPeople);
    setListedPeople(currentPeople => {
      return currentPeople.filter((person) => person.id !== personId)
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Add person" onPress={() => setIsAddMode(true)}/>
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={listedPeople}
        renderItem={itemData => (
          <PersonItem
            id={itemData.item.id}
            name={itemData.item.name}
            email={itemData.item.email}
            onDelete={deletePersonHandler}
          />
        )}
      />
      <PersonAddInput
        visible={isAddMode}
        onAddPerson={addPersonHandler}
        onCancel={cancelPersonAddHandler}
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
