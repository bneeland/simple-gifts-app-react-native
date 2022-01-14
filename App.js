import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import PersonItem from './components/PersonItem';
import PersonAddInput from './components/PersonAddInput';
import PersonDeleteConfirm from './components/PersonDeleteConfirm';

import InclusionAddSelect from './components/InclusionAddSelect';
import ExclusionAddSelect from './components/ExclusionAddSelect';

export default function App() {
  const [isAddPersonMode, setIsAddPersonMode] = useState(false);
  const [isDeletePersonMode, setIsDeletePersonMode] = useState(false);

  const [listedPeople, setListedPeople] = useState([]);

  const [personToDelete, setPersonToDelete] = useState();

  const [isAddInclusionMode, setIsAddInclusionMode] = useState(false);
  const [isDeleteInclusionMode, setIsDeleteInclusionMode] = useState(false);
  const [currentInclusion, setCurrentInclusion] = useState([]);
  const [listedInclusions, setListedInclusions] = useState([]);

  const [isAddExclusionMode, setIsAddExclusionMode] = useState(false);
  const [isDeleteExclusionMode, setIsDeleteExclusionMode] = useState(false);
  const [currentExclusion, setCurrentExclusion] = useState([]);
  const [listedExclusions, setListedExclusions] = useState([]);

  const cancelAddPersonHandler = () => {
    setIsAddPersonMode(false);
  };

  const addPersonHandler = (personName, personEmail) => {
    setListedPeople(currentPeople => [
      ...currentPeople,
      { id: Math.random()*Math.pow(10,18).toString(), name: personName, email: personEmail }
    ]);
    setIsAddPersonMode(false);
  };

  const deletePersonHandler = personId => {
    setPersonToDelete(personId);
    setIsDeletePersonMode(true);
  };

  const cancelDeletePersonHandler = () => {
    setPersonToDelete('');
    setIsDeletePersonMode(false);
  };

  const confirmDeletePersonHandler = personId => {
    setListedPeople(currentPeople => {
      return currentPeople.filter((person) => person.id !== personId)
    });
    setIsDeletePersonMode(false);
  };

  const startInclusionHandler = (personId) => {
    setIsAddInclusionMode(true);
    setCurrentInclusion([personId]);
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log('')
    console.log(currentInclusion);
  }
  const stopInclusionHandler = (personId) => {
    setCurrentInclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    setIsAddInclusionMode(false);
    console.log(currentInclusion);
  }

  const startExclusionHandler = (personId) => {
    setIsAddExclusionMode(true);
    setCurrentExclusion([personId]);
    console.log(currentExclusion);
  }
  const stopExclusionHandler = (personId) => {
    setCurrentExclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    setIsAddExclusionMode(false);
    console.log(currentExclusion);
  }

  const cancelAddInclusionHandler = () => {
    setIsAddInclusionMode(false);
  };

  const cancelAddExclusionHandler = () => {
    setIsAddExclusionMode(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.peopleContainer}>
        <Button title="Add person" onPress={() => setIsAddPersonMode(true)} />
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={listedPeople}
          renderItem={itemData => (
            <PersonItem
              id={itemData.item.id}
              name={itemData.item.name}
              email={itemData.item.email}
              onDelete={deletePersonHandler}
              onStartInclusion={startInclusionHandler}
              onStartExclusion={startExclusionHandler}
              onStopInclusion={stopInclusionHandler}
              onStopExclusion={stopExclusionHandler}
            />
          )}
        />
      </View>
      <View style={styles.inclusionsContainer}>
        <Button title="Add inclusion" onPress={() => setIsAddInclusionMode(true)} />
      </View>
      <View style={styles.exclusionsContainer}>
        <Button title="Add exclusion" onPress={() => setIsAddExclusionMode(true)} />
      </View>
      <PersonAddInput
        visible={isAddPersonMode}
        onAddPerson={addPersonHandler}
        onCancel={cancelAddPersonHandler}
      />
      <PersonDeleteConfirm
        visible={isDeletePersonMode}
        personToDelete={personToDelete}
        onDeleteConfirm={confirmDeletePersonHandler}
        onCancel={cancelDeletePersonHandler}
      />
      <InclusionAddSelect
        visible={false}
        onCancel={cancelAddInclusionHandler}
      />
      <ExclusionAddSelect
        visible={false}
        onCancel={cancelAddExclusionHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 4,
    backgroundColor: 'navajowhite',
  },
  peopleContainer: {
    flex: 6,
    backgroundColor: 'lightgoldenrodyellow',
    paddingTop: 16,
  },
  inclusionsContainer: {
    flex: 1,
    backgroundColor: 'oldlace',
    paddingTop: 16,
  },
  exclusionsContainer: {
    flex: 1,
    backgroundColor: 'papayawhip',
    paddingTop: 16,
  },
});
