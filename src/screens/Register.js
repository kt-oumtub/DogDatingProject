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
  Button,
} from 'react-native';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import globalStyles from '../styles/globalStyles';

import RegisterController from '../controllers/RegisterController';
import MemberModel from '../model/MemberModel';

export default function Register({navigation}) {
  const [name, setName] = useState('Mr.A');
  const [email, setEmail] = useState('a@mail.com');
  const [address, setAddress] = useState('63 Moo.4 Sansai Chiangmai 50290');
  const [tel, setTel] = useState('0801234567');
  const [birthday, setBirthday] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );
  const [memberImg, setMemberImg] = useState({photo: null});
  const [username, setUsername] = useState('testuser');
  const [password1, setPassword1] = useState('1234');
  const [password2, setPassword2] = useState('1234');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  function btnChoosePhoto() {
    const option = {noData: true};
    launchImageLibrary(option, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setMemberImg({photo: source});
      }
    });
  }

  function showDatepicker() {
    setShow(true);
  }

  function onChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let birthDay =
      currentDate.getDate() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getFullYear();
    setBirthday(birthDay);
  }

  function addZeroForDay() {
    if (date.getDate() < 10) {
      return '0' + date.getDate();
    } else {
      return date.getDate();
    }
  }

  function addZeroForMonth() {
    if (date.getMonth() + 1 < 10) {
      return '0' + (date.getMonth() + 1);
    } else {
      return date.getMonth() + 1;
    }
  }

  function onBtnCancel() {
    navigation.navigate('Login');
  }

  function checkImg() {
    if (memberImg.photo === null) {
      Alert.alert('Warning', 'Please select your Image');
      return false;
    } else {
      return true;
    }
  }

  function checkDetail() {
    if (name === '' || email === '' || tel === '' || address === '') {
      Alert.alert('Warning', 'Please fill out the information completely.');
      return false;
    } else {
      return true;
    }
  }

  async function checkAccount() {
    if (username === '' || password1 === '' || password2 === '') {
      Alert.alert('Warning', 'Please fill out the information completely.');
      return false;
    } else {
      const provoke = await new RegisterController().do_CheckUsername(username);
      const checkUsername = await new RegisterController().do_CheckUsername(
        username,
      );
      if (checkUsername === 'fail') {
        Alert.alert('Warning', 'Username is already , Please change.');
        return false;
      } else {
        return true;
      }
    }
  }

  function checkPass() {
    if (password1 != password2 || password2 != password1) {
      Alert.alert('Warning', 'Password not correct\nPlease try again');
      return false;
    } else {
      return true;
    }
  }

  async function onBtnSubmit() {
    let member = new MemberModel();
    if (checkImg() === true) {
      member.memberImg = memberImg.photo;
      if (checkDetail() === true) {
        member.name = name;
        member.email = email;
        member.address = address;
        member.tel = tel;
        member.birthday = birthday;
        if ((await checkAccount()) === true) {
          member.username = username;
          if (checkPass() === true) {
            member.password = password1;
            let res = await new RegisterController().do_Register(member);
            if (res === 'complete') {
              Alert.alert('Welcome!', 'Register success\nYou can login');
              console.log('register complete');
              navigation.navigate('Login');
            } else {
              Alert.alert('Error\nPlease try again');
              console.error('error');
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    new RegisterController().provokeFirebase();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={globalStyles.headerField}>
        <Text style={globalStyles.headerFont}>Register</Text>
      </View>

      <ScrollView style={styles.scrollviewStyles}>
        {/* Image */}
        <View style={styles.imgZone}>
          <Image source={{uri: memberImg.photo}} style={styles.imgStyle} />
          <Text style={styles.txtInPic}>Add Image</Text>
          <TouchableOpacity style={styles.addPicBtn} onPress={btnChoosePhoto}>
            <Icon name="camera" color="white" size={25} type="font-awesome-5" />
          </TouchableOpacity>
        </View>

        {/* Detail */}
        <View style={{paddingTop: 10}}>
          <Text style={styles.topic}>Detail</Text>

          {/* Name */}
          <View style={styles.detailZone}>
            <Text style={styles.titleInput}>Name</Text>
            <TextInput
              placeholder="name"
              style={styles.inputStyle}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.detailZone}>
            <Text style={styles.titleInput}>Email</Text>
            <TextInput
              placeholder="email"
              style={styles.inputStyle}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          {/* Tel */}
          <View style={styles.detailZone}>
            <Text style={styles.titleInput}>Tel</Text>
            <TextInput
              placeholder="tel"
              style={styles.inputStyle}
              keyboardType="number-pad"
              value={tel}
              onChangeText={setTel}
            />
          </View>
          {/* Birthday */}
          <View style={styles.detailZone}>
            <Text style={[styles.titleInput]}>Birthday</Text>

            <View style={styles.birthdayStyles}>
              <View style={[styles.dateZone]}>
                <TextInput
                  editable={false}
                  style={{fontSize: 18}}
                  placeholderTextColor="#000"
                  placeholder={
                    addZeroForDay() +
                    ' - ' +
                    addZeroForMonth() +
                    ' - ' +
                    date.getFullYear()
                  }
                />
              </View>

              <View style={[styles.calendarZone]}>
                <TouchableOpacity onPress={showDatepicker} style={{right: 0}}>
                  <Icon
                    name="calendar"
                    color="#2e5ac3"
                    size={38}
                    type="ionicon"
                  />
                </TouchableOpacity>
              </View>
              {show && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>
          </View>

          {/* Address */}
          <View style={styles.detailZone}>
            <Text style={styles.titleInput}>Address</Text>
            <TextInput
              placeholder="address"
              style={styles.inputStyle}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>

          {/* Account */}
          <View style={styles.accountZone}>
            <Text style={[styles.topic, {paddingTop: 30}]}>Account</Text>
            {/* Username */}
            <View style={styles.detailZone}>
              <Text style={styles.titleAccount}>Username</Text>
              <TextInput
                placeholder="username"
                style={styles.inputAccountStyle}
                value={username}
                onChangeText={setUsername}
              />
            </View>
            {/* Password1 */}
            <View style={styles.detailZone}>
              <Text style={styles.titleAccount}>Password</Text>
              <TextInput
                placeholder="username"
                style={styles.inputAccountStyle}
                value={password1}
                onChangeText={setPassword1}
                secureTextEntry={true}
              />
            </View>
            {/* Password2 */}
            <View style={styles.detailZone}>
              <Text style={styles.titleAccount} />
              <TextInput
                placeholder="username"
                style={styles.inputAccountStyle}
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>

        <View style={styles.btnZone}>
          <TouchableOpacity style={styles.btnContainer} onPress={onBtnCancel}>
            <LinearGradient
              colors={['#FF6C6C', '#FFDB93']}
              style={styles.gradientStyle}>
              <Text style={styles.btnFont}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={onBtnSubmit}>
            <LinearGradient
              colors={['#FF6C6C', '#FFDB93']}
              style={styles.gradientStyle}>
              <Text style={styles.btnFont}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollviewStyles: {
    paddingTop: 20,
    paddingHorizontal: 26,
  },
  imgZone: {
    width: 260,
    height: 260,
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#FF3939',
    borderRadius: 1000,
    backgroundColor: 'white',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  txtInPic: {
    position: 'absolute',
    top: 110,
    alignSelf: 'center',
    fontSize: 28,
    color: 'darkgray',
    zIndex: -1,
  },
  addPicBtn: {
    backgroundColor: '#F65050',
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: -6,
    bottom: 0,
    borderColor: 'darkgray',
    borderWidth: 1,
  },
  topic: {
    borderBottomWidth: 3,
    borderBottomColor: '#FF6C6C',
    paddingBottom: 4,
    marginBottom: 5,
    fontSize: 34,
    color: '#F65050',
  },
  detailZone: {
    paddingTop: 7,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleInput: {
    fontSize: 20,
    paddingRight: 20,
    flex: 1.19,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: 'darkgray',
    flex: 3,
  },
  birthdayStyles: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18,
    borderColor: 'darkgray',
    flex: 3,
  },
  dateZone: {
    flex: 3,
  },
  calendarZone: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    right: -8,
  },
  accountZone: {
    paddingTop: 0,
    borderBottomColor: '#F65050',
    borderBottomWidth: 3,
    paddingBottom: 12,
  },
  titleAccount: {
    fontSize: 20,
    paddingRight: 20,
    flex: 1.65,
  },
  inputAccountStyle: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: 'darkgray',
    flex: 3,
  },
  btnZone: {
    flexDirection: 'row',
    paddingTop: 26,
    paddingBottom: 46,
    justifyContent: 'space-around',
  },
  btnContainer: {
    height: 54,
    width: '40%',
    alignSelf: 'center',
  },
  gradientStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    // borderWidth: 0.25,
    height: 60,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnFont: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3c393c',
  },
});
