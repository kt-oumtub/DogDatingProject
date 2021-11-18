import firebaseConnection from '../../firebaseConnection';

var currentUser;
export default class LoginController {
  do_Login(username, password) {
    let userCorrect = false;
    let passCorrect = false;
    firebaseConnection
      .database()
      .ref('Member/')
      .on('child_added', function (snapshot) {
        if (username === snapshot.key) {
          userCorrect = true;
        }
      });
    if (userCorrect === true) {
      firebaseConnection
        .database()
        .ref('Member/' + username + '/password')
        .on('value', function (snapshot) {
          if (password === snapshot.val()) {
            passCorrect = true;
          }
        });
    }
    if (userCorrect === true && passCorrect === true) {
      currentUser = username;
      return 'pass';
    } else {
      return 'fail';
    }
  }

  getCurrentUser() {
    return currentUser;
  }

  provokeFirebase() {
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
