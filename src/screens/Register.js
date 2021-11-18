import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import globalStyleslo from '../styles/globalStyles';

import RegisterController from '../controllers/RegisterController';

export default function Register({navigation}) {
  return (
    <View>
      <Text>R</Text>
      <TouchableOpacity
        onPress={() => {
          new RegisterController().doIt();
        }}>
        <Text
          style={{fontSize: 40, textAlign: 'center', justifyContent: 'center'}}>
          CCC
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
