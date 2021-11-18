import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import LoginController from '../controllers/LoginController';

export default function Login({navigation}) {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('1234');
  const [togglePassword, setTogglePassword] = useState(true); //true === hide pwd
  const [icon, setIcon] = useState({iconName: 'eye', iconSolid: false});

  function toggleShowPassword() {
    if (togglePassword === true) {
      setTogglePassword(false);
      setIcon({iconName: 'eye-slash', iconSolid: true});
    } else {
      setTogglePassword(true);
    }
  }

  function onBtnLogin() {
    if (username === null || username === '') {
      alert('Please insert Username');
    } else if (password === null || password === '') {
      alert('Please insert Password');
    } else {
      let result = new LoginController().do_Login(username, password);
      if (result === 'pass') {
        //   navigation.navigate('Home', username);
        alert('Login');
      } else {
        console.log('fail');
        alert('Username or Password is not correct\nPlease try again');
      }
    }
  }

  function onTextSignup() {
    navigation.navigate('Register');
  }

  function onTextGuest() {
    // navigation.navigate('GuestHome');
  }

  useEffect(() => {
    new LoginController().provokeFirebase();
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.imgZone}>
          <Image
            style={styles.imgStyles}
            source={require('../assets/logoApp.png')}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 30}}>
          <View style={{paddingBottom: 18}}>
            <Text style={styles.topic}>Username</Text>
            <View style={styles.inputField}>
              <Icon
                name="user-alt"
                size={28}
                type="font-awesome-5"
                style={styles.iconInsideForm}
              />
              <TextInput
                placeholder="username"
                style={{fontSize: 20}}
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          <View style={{paddingBottom: 18}}>
            <Text style={styles.topic}>Password</Text>
            <View style={[styles.inputField, {flex: 1}]}>
              <Icon
                name="key"
                size={28}
                type="font-awesome-5"
                style={styles.iconInsideForm}
              />
              <TextInput
                placeholder="password"
                style={{fontSize: 20, flex: 1}}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={togglePassword}
              />

              <TouchableOpacity onPress={toggleShowPassword}>
                <Icon
                  name={icon.iconName}
                  solid={icon.iconSolid}
                  size={28}
                  type="font-awesome-5"
                  style={styles.iconInsideForm}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.signInBtnContainer}
            onPress={onBtnLogin}>
            <LinearGradient
              colors={['#FF6C6C', '#FFDB93']}
              style={styles.gradientStyle}>
              <Text style={styles.sigInFont}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.registerZone}>
            <Text style={{fontSize: 14}}>Don't have an account </Text>
            <TouchableOpacity onPress={onTextSignup}>
              <Text
                style={{fontSize: 16, color: '#FF6C6C', fontWeight: 'bold'}}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialZone}>
            <TouchableOpacity onPress={onTextGuest}>
              <Icon
                name="user-alt"
                size={30}
                color="gray"
                reverse
                reverseColor="white"
                type="font-awesome-5"
                containerStyle={styles.shaderIcon}
              />
            </TouchableOpacity>
            <Text style={styles.topic}>Try with Guest</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imgZone: {
    paddingTop: 20,
    flex: 1,
  },
  imgStyles: {
    width: 280,
    height: 250,
    alignSelf: 'center',
  },
  topic: {
    fontSize: 20,
    paddingLeft: 2,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  inputField: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1.1,
    borderRadius: 10,
  },
  iconInsideForm: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'center',
  },
  signInBtnContainer: {
    marginTop: 10,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
  },
  gradientStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    borderWidth: 1.11,
    height: 60,
    justifyContent: 'center',
  },
  sigInFont: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3c393c',
  },
  registerZone: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '10%',
    width: '100%',
    paddingTop: 6,
    fontSize: 16,
  },
  socialZone: {
    flexDirection: 'row',
    marginTop: -5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
  },
  shaderIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
  },
});
