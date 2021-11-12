import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          color: '#000',
          textDecorationLine: 'underline',
        }}>
        Rework Project
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
