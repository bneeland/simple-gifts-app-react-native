import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const SendEmailsButton = props => {
  return (
    <View>
      <Button title="Send emails out..." onPress={props.onSendEmails} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default SendEmailsButton;
