import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import PersonItem from './components/PersonItem';
import PersonAddInput from './components/PersonAddInput';
import PersonDeleteConfirm from './components/PersonDeleteConfirm';

import InclusionItem from './components/InclusionItem';
import ExclusionItem from './components/ExclusionItem';

export default function App() {
  const [isAddPersonMode, setIsAddPersonMode] = useState(false);
  const [isDeletePersonMode, setIsDeletePersonMode] = useState(false);

  const [listedPeople, setListedPeople] = useState([]);

  const [personToDelete, setPersonToDelete] = useState();

  const [isAddInclusionMode, setIsAddInclusionMode] = useState(false);
  const [currentInclusion, setCurrentInclusion] = useState([]);
  const [listedInclusions, setListedInclusions] = useState([]);

  const [isAddExclusionMode, setIsAddExclusionMode] = useState(false);
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
    console.log(currentInclusion);
  };
  const stopInclusionHandler = (personId) => {
    setCurrentInclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    console.log(currentInclusion);
  };
  const confirmInclusionHandler = () => {
    setListedInclusions(currentInclusions => [
      ...currentInclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentInclusion[0], to: currentInclusion[1] }
    ]);
    setCurrentInclusion([]);
    setIsAddInclusionMode(false);
    console.log(currentInclusion);
    console.log(listedInclusions);
  };
  const cancelInclusionHandler = () => {
    setCurrentInclusion([]);
    setIsAddInclusionMode(false);
  };

  const startExclusionHandler = (personId) => {
    setIsAddExclusionMode(true);
    setCurrentExclusion([personId]);
    console.log(currentExclusion);
  };
  const stopExclusionHandler = (personId) => {
    setCurrentExclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    console.log(currentExclusion);
  };
  const confirmExclusionHandler = () => {
    setListedExclusions(currentExclusions => [
      ...currentExclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentExclusion[0], to: currentExclusion[1] }
    ]);
    setCurrentExclusion([]);
    setIsAddExclusionMode(false);
    console.log(currentExclusion);
    console.log(listedExclusions);
  };
  const cancelExclusionHandler = () => {
    setCurrentExclusion([]);
    setIsAddExclusionMode(false);
  };

  const getPersonItemName = (personId) => {
    return listedPeople.find(el => (el.id === personId)).name;
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
              onStopInclusion={stopInclusionHandler}
              onConfirmInclusion={confirmInclusionHandler}
              onCancelInclusion={cancelInclusionHandler}
              onStartExclusion={startExclusionHandler}
              onStopExclusion={stopExclusionHandler}
              onConfirmExclusion={confirmExclusionHandler}
              onCancelExclusion={cancelExclusionHandler}
            />
          )}
        />
      </View>
      <View style={styles.inclusionsContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={listedInclusions}
          renderItem={itemData => (
            <InclusionItem
              from={getPersonItemName(itemData.item.from)}
              to={getPersonItemName(itemData.item.to)}
            />
          )}
        />
      </View>
      <View style={styles.exclusionsContainer}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={listedExclusions}
          renderItem={itemData => (
            <ExclusionItem
              from={getPersonItemName(itemData.item.from)}
              to={getPersonItemName(itemData.item.to)}
            />
          )}
        />
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
    flex: 5,
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
