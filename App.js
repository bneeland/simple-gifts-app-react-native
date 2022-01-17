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

    console.log(vectors);





// Nodemailer through own express backend api

// From: 'info@simplegiftsapp.com',
// To: 'brian.neeland@gmail.com',
// Subject: 'Simple Gifts - Test 1',
// TextBody: 'Hello, this is a test email.',
// HtmlBody: '<b>Hello</b>, this a test email.',

    var urlencoded = new URLSearchParams();
    urlencoded.append("Key1", "Value1");
    urlencoded.append("Key2", "Value2");

    fetch('http://localhost:5000', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Accept': 'application/json',
      //   'X-Postmark-Server-Token': '742b493c-99cd-499a-9c29-b0a8318cf381',
      //   'Access-Control-Allow-Origin': '*',
      // },
      body: urlencoded,
    });

// Nodemailer: Doesn't work via react native because it's front end only.
    // let transporter = nodemailer.createTransport({
    //   host: 'smtp.postmarkapp.com',
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: '742b493c-99cd-499a-9c29-b0a8318cf381',
    //     pass: '742b493c-99cd-499a-9c29-b0a8318cf381',
    //   },
    //   tls:{
    //     rejectUnauthorized: false,
    //   }
    // });
    //
    // let mailOptions = {
    //   from: '"Simple Gifts app" <info@simplegiftsapp.com>',
    //   to: 'brian.neeland@gmail.com',
    //   subject: 'Simple Gifts app - Test 1',
    //   text: 'Hello, this is a test email.',
    //   html: '<b>Hello</b>, this a test email.',
    // };
    //
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //       return console.log(error);
    //   }
    //   console.log('Message sent: %s', info.messageId);
    //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    //
    //   res.render('contact', {msg:'Email has been sent'});
    // });

// POSTMARK NODE.JS LIBRARY: DOESN'T WORK BECAUSE OF 'Cross-Origin Request Blocked' ERROR
    // // Require:
    // var postmark = require("postmark");
    //
    // // Send an email:
    // var client = new postmark.ServerClient("742b493c-99cd-499a-9c29-b0a8318cf381");
    //
    // client.sendEmail({
    //   "From": "info@simplegiftsapp.com",
    //   "To": "brian.neeland@gmail.com",
    //   "Subject": "Hello from Postmark",
    //   "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
    //   "TextBody": "Hello from Postmark!",
    //   "MessageStream": "outbound"
    // });

// POSTMARK API: DOESN'T WORK BECAUSE OF 'Cross-Origin Request Blocked' ERROR
    // fetch('https://api.postmarkapp.com/email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     'X-Postmark-Server-Token': '742b493c-99cd-499a-9c29-b0a8318cf381',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   body: JSON.stringify({
    //     service_id: 'service_nbnolct',
    //     template_id: 'template_9c542q8',
    //     user_id: 'user_dDwrcQ642rbj3GiInsw2h',
    //     template_params: {
    //       'From': 'info@simplegiftsapp.com',
    //       'To': 'brian.neeland@gmail.com',
    //       'Subject': 'Simple Gifts - Test 1',
    //       'TextBody': 'Hello, this is a test email.',
    //       'HtmlBody': '<b>Hello</b>, this a test email.',
    //       'MessageStream': 'outbound'
    //     },
    //   }),
    // });


// EMAILJS: WORKS, BUT ONLY FROM WEB. FROM ANDROID RETURNS ERROR SAYING IT'S BLOCKED FROM MOBILE.
    // fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     service_id: 'service_nbnolct',
    //     template_id: 'template_9c542q8',
    //     user_id: 'user_dDwrcQ642rbj3GiInsw2h',
    //     template_params: {
    //       'subject': 'Test subject',
    //       'message': 'Test message',
    //       'to_email': 'brian.neeland@gmail.com',
    //       'from_email': 'info@simplegiftsapp.com'
    //     },
    //   }),
    // });

// EMAILJS: WORKS, BUT ONLY FROM WEB. FROM ANDROID RETURNS ERROR SAYING IT'S BLOCKED FROM MOBILE.
    // var templateParams = {
    //   subject: 'Test subject 3',
    //   message: 'Test message 3',
    //   to_email: 'brian.neeland@gmail.com',
    //   from_email: 'info@simplegiftsapp.com',
    // };
    //
    // emailjs.send('service_nbnolct', 'template_9c542q8', templateParams, 'user_dDwrcQ642rbj3GiInsw2h')
    //   .then(function(response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //   }, function(error) {
    //     console.log('FAILED...', error);
    // });






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
