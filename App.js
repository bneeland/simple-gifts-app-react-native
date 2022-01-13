import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import PersonInput from './components/PersonInput';

export default function App() {
  const [isAddMode, setIsAddMode] = useState(false);

  const cancelPersonInputHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Add person" onPress={() => setIsAddMode(true)}/>
      <PersonInput
        visible={isAddMode}
        onCancel={cancelPersonInputHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
