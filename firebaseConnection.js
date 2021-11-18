import * as firebaseConnection from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBXApWxzSEUunv8wZA7gx_Fngpb3J6bl-M',
  authDomain: 'dogdatingprj.firebaseapp.com',
  projectId: 'dogdatingprj',
  storageBucket: 'dogdatingprj.appspot.com',
  messagingSenderId: '195400048253',
  appId: '1:195400048253:web:e302e110be71d603361b14',
};
if (!firebaseConnection.apps.length) {
  firebaseConnection.initializeApp(firebaseConfig);
} else {
  firebaseConnection.app();
}

export default firebaseConnection;
