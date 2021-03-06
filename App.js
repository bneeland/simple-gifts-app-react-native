import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, Pressable, Modal, SafeAreaView } from 'react-native';

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

import Colors from './constants/Colors';

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
    setIsRulesToggleOpen(false);
  };

  const deleteExclusionHandler = exclusionId => {
    setExclusionToDelete(exclusionId);
    setIsDeleteExclusionMode(true);
    setIsRulesToggleOpen(false);
  };

  const cancelDeletePersonHandler = () => {
    setPersonToDelete('');
    setIsDeletePersonMode(false);
  };

  const cancelDeleteInclusionHandler = () => {
    setInclusionToDelete('');
    setIsDeleteInclusionMode(false);
    setIsRulesToggleOpen(true);
  };

  const cancelDeleteExclusionHandler = () => {
    setExclusionToDelete('');
    setIsDeleteExclusionMode(false);
    setIsRulesToggleOpen(true);
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
            "subject": "Simple Gifts: Your assigned giftee",
            "giver_name": giver['name'],
            "receiver_name": receiver['name'],
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

      Alert.alert('Success!', 'Simple Gifts has sent emails to each person in your list, informing them of the person assigned to them for the gift exchange.', [
        {text: 'Close'}
      ]);

    } catch(error) {
      console.log('Error in sending emails:', error);
      Alert.alert('Hang on???', 'There seems to be an issue with your inputs.\n\nMaybe check them to make sure they make sense and try to finalize again.', [
        {text: 'Go back'}
      ]);
    }

  };

  const confirmDeletePersonHandler = personId => {
    // Delete person
    setListedPeople(currentPeople => {
      return currentPeople.filter((person) => person.id !== personId)
    });
    // Delete inclusions associated with that person
    setListedInclusions(activeInclusions => {
      return activeInclusions.filter((inclusion) => inclusion.from !== personId)
    });
    setListedInclusions(activeInclusions => {
      return activeInclusions.filter((inclusion) => inclusion.to !== personId)
    });
    // Delete exclusions associated with that person
    setListedExclusions(activeExclusions => {
      return activeExclusions.filter((exclusion) => exclusion.from !== personId)
    });
    setListedExclusions(activeExclusions => {
      return activeExclusions.filter((exclusion) => exclusion.to !== personId)
    });
    setIsDeletePersonMode(false);
  };

  const confirmDeleteInclusionHandler = inclusionId => {
    setListedInclusions(currentInclusion => {
      return currentInclusion.filter((inclusion) => inclusion.id !== inclusionId)
    });
    setIsRulesToggleOpen(false);
    setIsDeleteInclusionMode(false);
  };

  const confirmDeleteExclusionHandler = exclusionId => {
    setListedExclusions(currentExclusion => {
      return currentExclusion.filter((exclusion) => exclusion.id !== exclusionId)
    });
    setIsRulesToggleOpen(false);
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.standaloneContainer}>
          <Text style={styles.heading}>People</Text>
        </View>
        <View style={styles.peopleContainer}>
          <View style={styles.topButtonContainer}>
            {
              isAddInclusionMode ? (
                <Pressable style={styles.buttonBox} onPress={cancelInclusionHandler}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              ) : null
            }
            {
              isAddExclusionMode ? (
                <Pressable style={styles.buttonBox} onPress={cancelExclusionHandler}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              ) : null
            }
            {
              (!isAddInclusionMode && !isAddExclusionMode) ? (
                <Pressable style={styles.buttonBox} onPress={() => setIsAddPersonMode(true)}>
                  <Text style={styles.buttonText}>Add person</Text>
                </Pressable>
              ) : null
            }
          </View>
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
          {
            (Object.keys(listedPeople).length < 3) ? (
              <Text style={styles.helpText}>Add at least 3 people to start assigning</Text>
            ) : null
          }
        </View>
        {
          (Object.keys(listedInclusions).length + Object.keys(listedExclusions).length > 0) ? (
            <Pressable onPress={toggleRulesHandler}>
              <View style={[styles.standaloneContainer, styles.rulesHeader]}>
                <Text style={styles.heading}>??? Rules ({Object.keys(listedInclusions).length + Object.keys(listedExclusions).length})</Text>
              </View>
            </Pressable>
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
        <Modal
          animationType="slide"
          visible={isRulesToggleOpen}
          onRequestClose={() => toggleRulesHandler}
        >
          <Pressable onPress={toggleRulesHandler}>
            <View style={styles.standaloneContainer}>
              <Text style={styles.heading}>??? Rules ({Object.keys(listedInclusions).length + Object.keys(listedExclusions).length})</Text>
            </View>
          </Pressable>
          <View style={styles.inclusionsContainer}>
            <Text style={styles.subheading}>??? Must give to???</Text>
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
            {
              (Object.keys(listedInclusions).length == 0) ? (
                <Text style={styles.helpText}>{`Create rules on the main "People" screen.
                Rules will appear here.`}</Text>
              ) : null
            }
          </View>
          <View style={styles.exclusionsContainer}>
            <Text style={styles.subheading}>??? Mustn't give to???</Text>
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
            {
              (Object.keys(listedExclusions).length == 0) ? (
                <Text style={styles.helpText}>{`Create rules on the main "People" screen.
                Rules will appear here.`}</Text>
              ) : null
            }
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screen: {
    flex: 1,
    paddingTop: 16+8,
  },
  peopleContainer: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 0,
    paddingHorizontal: 16,
  },
  inclusionsContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  exclusionsContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  standaloneContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  topButtonContainer: {
    paddingBottom: 8,
  },
  rulesHeader: {
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  finalizeHeader: {
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkButtonBackground,
    borderRadius: 150,
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.darkButtonText,
  },
  helpText: {
    flex: 1,
    color: Colors.disabledButtonText,
    textAlign: 'center',
  }
});
