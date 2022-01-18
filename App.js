import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import PersonItem from './components/PersonItem';
import PersonAddInput from './components/PersonAddInput';
import PersonDeleteConfirm from './components/PersonDeleteConfirm';
import InclusionDeleteConfirm from './components/InclusionDeleteConfirm';
import ExclusionDeleteConfirm from './components/ExclusionDeleteConfirm';

import InclusionItem from './components/InclusionItem';
import ExclusionItem from './components/ExclusionItem';

import AssignButton from './components/AssignButton';
import AssignConfirm from './components/AssignConfirm';

export default function App() {
  const [isAddPersonMode, setIsAddPersonMode] = useState(false);
  const [isDeletePersonMode, setIsDeletePersonMode] = useState(false);
  const [isDeleteInclusionMode, setIsDeleteInclusionMode] = useState(false);
  const [isDeleteExclusionMode, setIsDeleteExclusionMode] = useState(false);
  const [isAssignMode, setIsAssignMode] = useState(false);

  const [listedPeople, setListedPeople] = useState([]);

  const [personToDelete, setPersonToDelete] = useState();
  const [inclusionToDelete, setInclusionToDelete] = useState();
  const [exclusionToDelete, setExclusionToDelete] = useState();

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

  const deleteInclusionHandler = inclusionId => {
    setInclusionToDelete(inclusionId);
    setIsDeleteInclusionMode(true);
  };

  const deleteExclusionHandler = exclusionId => {
    setExclusionToDelete(exclusionId);
    setIsDeleteExclusionMode(true);
  };

  const cancelDeletePersonHandler = () => {
    setPersonToDelete('');
    setIsDeletePersonMode(false);
  };

  const cancelDeleteInclusionHandler = () => {
    setInclusionToDelete('');
    setIsDeleteInclusionMode(false);
  };

  const cancelDeleteExclusionHandler = () => {
    setExclusionToDelete('');
    setIsDeleteExclusionMode(false);
  };

  const cancelAssignHandler = () => {
    setIsAssignMode(false);
  };

  const assignHandler = () => {
    setIsAssignMode(true);
  };

  const confirmAssignHandler = () => {
    setIsAssignMode(false);

    function randomize(arrayIn) {
        let arrayOut = [];
        for(let i in arrayIn) {
            let randomIndex = Math.floor(Math.random() * arrayIn.length);
            while(arrayOut.includes(arrayIn[randomIndex])) {
                randomIndex = Math.floor(Math.random() * arrayIn.length);
            }
            arrayOut[i] = arrayIn[randomIndex];
        }
        return arrayOut;
    }

    function randomizePeople(listedPeople) {
        var randomizedListedPeople = randomize(listedPeople);
        randomizedListedPeople = randomize(randomizedListedPeople);
        randomizedListedPeople = randomize(randomizedListedPeople);
        randomizedListedPeople = randomize(randomizedListedPeople);

        return randomizedListedPeople;
    };

    function get_vectors(randomizedListedPeople, listedInclusions, listedExclusions) {

      let vectors = {};

      let vectorsNames = {};

      for (const listedInclusion of listedInclusions) {

        vectors[listedInclusion['from']] = listedInclusion['to'];

        vectorsNames[listedPeople.find(person => person.id == listedInclusion['from'])['name']] = listedPeople.find(person => person.id == listedInclusion['to'])['name'];

      }

      let excluded = false;
      let matched = false;
      let iterations = 0;
      let person2;
      let n = 0;

      for (let [i, person1] of Object.entries(randomizedListedPeople)) {

        matched = false;
        iterations = 0;

        if (!(person1['id'] in vectors)) {

          if (i == (randomizedListedPeople.length - 1)) {
            n = 0;

          } else {

            n = parseInt(i) + 1;

          }

          while (!(matched)) {

            if (iterations < (randomizedListedPeople.length * 2)) {

              excluded = false;
              person2 = randomizedListedPeople[n];

              if (person2 == person1) {

                if (n >= (randomizedListedPeople.length - 1)) {
                  n = 0;
                } else {
                  n++;
                }
                iterations++;

              } else if (Object.values(vectors).includes(person2['id'])) {

                if (n >= (randomizedListedPeople.length - 1)) {
                  n = 0;
                } else {
                  n++;
                }
                iterations++;

              } else {

                for (const listedExclusion of listedExclusions) {

                  if (listedExclusion['from'] == person1['id'] && listedExclusion['to'] == person2['id']) {

                    excluded = true;
                    break;

                  }
                }

                if (excluded) {

                  if (n >= (randomizedListedPeople.length - 1)) {
                    n = 0;
                  } else {
                    n++;
                  }
                  iterations++;

                } else {

                  vectors[person1['id']] = person2['id'];
                  matched = true;

                  vectorsNames[person1['name']] = person2['name'];

                }
              }
            } else {

              return {0: 0};

            }
          }
        }
      }

      return vectors;

    }


    var vectors = {0: 0};

    var randomizedListedPeople = {};

    let maxIterations = 3;
    let iterations = 0;

    while (vectors[0] === 0 && iterations <= maxIterations) {

      iterations++;

      randomizedListedPeople = randomizePeople(listedPeople);

      vectors = get_vectors(randomizedListedPeople, listedInclusions, listedExclusions);

    }

    for (let giverId in vectors) {
      let receiverId = vectors[giverId];
      let giver = listedPeople.find(person => person.id == giverId);
      let receiver = listedPeople.find(person => person.id == receiverId);

      let giverEmail = giver['email'];
      let giverName = giver['name'];
      let receiverName = receiver['name'];

      // EmailJS from Postman javascript fetch output (from react-native-requests test project)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "service_id": "service_su87f99",
        "template_id": "template_9c542q8",
        "user_id": "user_dDwrcQ642rbj3GiInsw2h",
        "template_params": {
          "subject": "Test subject",
          "message": `Hello ${giver['name']}, The person you will give a gift to is ${receiver['name']}.`,
          "to_email": giver['email'],
          "from_email": "info@simplegiftsapp.com"
        },
        "accessToken": "84d6aee92283c6be025714a940ced917",
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

  };

  const confirmDeletePersonHandler = personId => {
    setListedPeople(currentPeople => {
      return currentPeople.filter((person) => person.id !== personId)
    });
    setIsDeletePersonMode(false);
  };

  const confirmDeleteInclusionHandler = inclusionId => {
    setListedInclusions(currentInclusion => {
      return currentInclusion.filter((inclusion) => inclusion.id !== inclusionId)
    });
    setIsDeleteInclusionMode(false);
  };

  const confirmDeleteExclusionHandler = exclusionId => {
    setListedExclusions(currentExclusion => {
      return currentExclusion.filter((exclusion) => exclusion.id !== exclusionId)
    });
    setIsDeleteExclusionMode(false);
  };

  const startInclusionHandler = (personId) => {
    setIsAddInclusionMode(true);
    setCurrentInclusion([personId]);
  };
  const stopInclusionHandler = (personId) => {
    setCurrentInclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
  };
  const confirmInclusionHandler = () => {
    setListedInclusions(currentInclusions => [
      ...currentInclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentInclusion[0], to: currentInclusion[1] }
    ]);
    setCurrentInclusion([]);
    setIsAddInclusionMode(false);
  };
  const cancelInclusionHandler = () => {
    setCurrentInclusion([]);
    setIsAddInclusionMode(false);
  };

  const startExclusionHandler = (personId) => {
    setIsAddExclusionMode(true);
    setCurrentExclusion([personId]);
  };
  const stopExclusionHandler = (personId) => {
    setCurrentExclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
  };
  const confirmExclusionHandler = () => {
    setListedExclusions(currentExclusions => [
      ...currentExclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentExclusion[0], to: currentExclusion[1] }
    ]);
    setCurrentExclusion([]);
    setIsAddExclusionMode(false);
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
              id={itemData.item.id}
              onDelete={deleteInclusionHandler}
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
              id={itemData.item.id}
              onDelete={deleteExclusionHandler}
            />
          )}
        />
      </View>
      <View>
        <AssignButton
          onAssign={assignHandler}
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
      <InclusionDeleteConfirm
        visible={isDeleteInclusionMode}
        inclusionToDelete={inclusionToDelete}
        onDeleteConfirm={confirmDeleteInclusionHandler}
        onCancel={cancelDeleteInclusionHandler}
      />
      <ExclusionDeleteConfirm
        visible={isDeleteExclusionMode}
        exclusionToDelete={exclusionToDelete}
        onDeleteConfirm={confirmDeleteExclusionHandler}
        onCancel={cancelDeleteExclusionHandler}
      />
      <AssignConfirm
        visible={isAssignMode}
        onCancel={cancelAssignHandler}
        onConfirm={confirmAssignHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
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
