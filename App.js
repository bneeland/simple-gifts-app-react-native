import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Pressable } from 'react-native';

import PersonItem from './components/PersonItem';
import PersonAddInput from './components/PersonAddInput';
import PersonDeleteConfirm from './components/PersonDeleteConfirm';
import InclusionAddConfirm from './components/InclusionAddConfirm';
import InclusionDeleteConfirm from './components/InclusionDeleteConfirm';
import ExclusionAddConfirm from './components/ExclusionAddConfirm';
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
  const [isConfirmInclusionMode, setIsConfirmInclusionMode] = useState(false);

  const [isAddExclusionMode, setIsAddExclusionMode] = useState(false);
  const [currentExclusion, setCurrentExclusion] = useState([]);
  const [listedExclusions, setListedExclusions] = useState([]);
  const [isConfirmExclusionMode, setIsConfirmExclusionMode] = useState(false);

  const [isRulesToggleOpen, setIsRulesToggleOpen] = useState(false);

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

      try {
        randomizedListedPeople = randomizePeople(listedPeople);
      } catch(error) {
        console.log('Error in randomzing people:', error);
        Alert.alert('Hang on...', 'There seems to be an issue with your inputs.\n\nMaybe check them to make sure they make sense and try this button again.', [
          {text: 'Go back'}
        ]);
      }

      try {
        vectors = get_vectors(randomizedListedPeople, listedInclusions, listedExclusions);
      } catch(error) {
        console.log('Error in assigning people:', error);
        Alert.alert('Hang on...', 'There seems to be an issue with your inputs.\n\nMaybe check them to make sure they make sense and try this button again.', [
          {text: 'Go back'}
        ]);
      }

    }

    try {
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
    } catch(error) {
      console.log('Error in sending emails:', error);
      Alert.alert('Hang on...', 'There seems to be an issue with your inputs.\n\nMaybe check them to make sure they make sense and try this button again.', [
        {text: 'Go back'}
      ]);
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
    setIsAddExclusionMode(false);
    setCurrentExclusion([]);
  };
  const stopInclusionHandler = (personId) => {
    setCurrentInclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    setIsConfirmInclusionMode(true);
  };
  const confirmInclusionHandler = () => {
    setListedInclusions(currentInclusions => [
      ...currentInclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentInclusion[0], to: currentInclusion[1] }
    ]);
    setIsAddInclusionMode(false);
    setCurrentInclusion([]);
    setIsConfirmInclusionMode(false);
  };
  const cancelInclusionHandler = () => {
    setCurrentInclusion([]);
    setIsAddInclusionMode(false);
    setIsConfirmInclusionMode(false);
  };

  const startExclusionHandler = (personId) => {
    setIsAddExclusionMode(true);
    setCurrentExclusion([personId]);
    setIsAddInclusionMode(false);
    setCurrentInclusion([]);
  };
  const stopExclusionHandler = (personId) => {
    setCurrentExclusion(currentPersonId => [
      ...currentPersonId, personId
    ]);
    setIsConfirmExclusionMode(true);
  };
  const confirmExclusionHandler = () => {
    setListedExclusions(currentExclusions => [
      ...currentExclusions,
      { id: Math.random()*Math.pow(10,18).toString(), from: currentExclusion[0], to: currentExclusion[1] }
    ]);
    setIsAddExclusionMode(false);
    setCurrentExclusion([]);
    setIsConfirmExclusionMode(false);
  };
  const cancelExclusionHandler = () => {
    setCurrentExclusion([]);
    setIsAddExclusionMode(false);
    setIsConfirmExclusionMode(false);
  };

  const getPersonItemName = (personId) => {
    return listedPeople.find(el => (el.id === personId)).name;
  };

  const toggleRulesHandler= () => {
    if (isRulesToggleOpen) {
      setIsRulesToggleOpen(false);
    } else {
      setIsRulesToggleOpen(true);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.standaloneContainer}>
        <Text style={styles.heading}>People</Text>
      </View>
      <View style={styles.peopleContainer}>
        {
          isAddInclusionMode ? (
            <Button title="Cancel rule-making" onPress={cancelInclusionHandler} />
          ) : null
        }
        {
          isAddExclusionMode ? (
            <Button title="Cancel rule-making" onPress={cancelExclusionHandler} />
          ) : null
        }
        {
          (!isAddInclusionMode && !isAddExclusionMode) ? (
            <Button title="Add person" onPress={() => setIsAddPersonMode(true)} />
          ) : null
        }
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
              isAddInclusionMode={isAddInclusionMode}
              currentInclusion={currentInclusion[0]}
              onStartExclusion={startExclusionHandler}
              onStopExclusion={stopExclusionHandler}
              isAddExclusionMode={isAddExclusionMode}
              currentExclusion={currentExclusion[0]}
            />
          )}
        />
      </View>
      <View style={[styles.standaloneContainer, styles.rulesHeader]}>
        <Pressable onPress={toggleRulesHandler}>
          <Text style={styles.heading}>Rules ({Object.keys(listedInclusions).length + Object.keys(listedExclusions).length})</Text>
        </Pressable>
      </View>
      {
        (isRulesToggleOpen) ? (
          <>
          <View style={styles.inclusionsContainer}>
            <Text style={styles.subheading}>Must give to…</Text>
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
            <Text style={styles.subheading}>Mustn't give to…</Text>
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
          </>
        ) : null
      }
      {
        (Object.keys(listedPeople).length >= 3) ? (
          <View style={[styles.standaloneContainer, styles.finalizeHeader]}>
            <AssignButton
              onAssign={assignHandler}
            />
          </View>
        ) : null
      }

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
      <InclusionAddConfirm
        visible={isConfirmInclusionMode}
        onConfirm={confirmInclusionHandler}
        onCancel={cancelInclusionHandler}
      />
      <InclusionDeleteConfirm
        visible={isDeleteInclusionMode}
        inclusionToDelete={inclusionToDelete}
        onDeleteConfirm={confirmDeleteInclusionHandler}
        onCancel={cancelDeleteInclusionHandler}
      />
      <ExclusionAddConfirm
        visible={isConfirmExclusionMode}
        onConfirm={confirmExclusionHandler}
        onCancel={cancelExclusionHandler}
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
    paddingTop: 16+8,
    backgroundColor: 'navajowhite',
  },
  peopleContainer: {
    flex: 1,
    backgroundColor: 'lightgoldenrodyellow',
    padding: 8,
    paddingBottom: 0,
  },
  inclusionsContainer: {
    flex: 5,
    backgroundColor: 'oldlace',
    padding: 8,
  },
  exclusionsContainer: {
    flex: 5,
    backgroundColor: 'papayawhip',
    padding: 8,
  },
  standaloneContainer: {
    backgroundColor: 'papayawhip',
    padding: 8,
  },
  rulesHeader: {
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  finalizeHeader: {
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});
