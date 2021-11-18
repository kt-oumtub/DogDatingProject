import firebaseConnection from '../../firebaseConnection';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default class RegisterController {
  async do_Register(member) {
    let imgUrl = await this.uploadImg(member.username, member.memberImg);
    firebaseConnection
      .database()
      .ref('Member/' + member.username)
      .set({
        name: member.name,
        email: member.email,
        address: member.address,
        tel: member.tel,
        birthday: member.birthday,
        memberImg: imgUrl,
        username: member.username,
        password: member.password,
      });
    return 'complete';
  }

  async uploadImg(username, memberImg) {
    const firebaseConfig = {
      apiKey: 'AIzaSyBXApWxzSEUunv8wZA7gx_Fngpb3J6bl-M',
      authDomain: 'dogdatingprj.firebaseapp.com',
      databaseURL: 'https://dogdatingprj-default-rtdb.firebaseio.com',
      projectId: 'dogdatingprj',
      storageBucket: 'dogdatingprj.appspot.com',
      messagingSenderId: '195400048253',
      appId: '1:195400048253:web:e302e110be71d603361b14',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    // let imgName = memberImg.substring(memberImg.lastIndexOf('/') + 1);
    let newImgName = username + '_imgProfile';
    let url;
    const ref = storage().ref(username + '/ImageProfile/' + newImgName);
    try {
      await ref.putFile(memberImg);
      console.log('upload success');
      url = await ref.getDownloadURL();
    } catch (error) {
      console.log('err');
    }
    return url;
  }

  async do_CheckUsername(username) {
    let alreadyCheck = [];
    let canUse = true;

    await firebaseConnection
      .database()
      .ref('Member/')
      .on('child_added', function (snapshot) {
        alreadyCheck.push(snapshot.key);
      });
    for (let i = 0; i < alreadyCheck.length; i++) {
      if (username === alreadyCheck[i]) {
        return 'fail';
        i = alreadyCheck.length;
      } else {
        return 'pass';
      }
    }
  }

  provokeFirebase() {
    /*
        this function make for provoke firebase
        first time on run app firebase is slow 
        this function for fix
    */
    let provoke = [];
    firebaseConnection
      .database()
      .ref('Member/')
      .on('child_added', function (snapshot) {
        provoke.push(snapshot.key);
      });
    return provoke;
  }
}
