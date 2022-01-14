import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const SendEmailsButton = props => {
  return (
    <View>
      <Button title="Match people and send emails…" onPress={props.onSendEmails} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SendEmailsButton;
