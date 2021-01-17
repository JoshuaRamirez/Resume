const firebase = require("firebase/app");
require("firebase/database");
var firebaseConfig = {
  apiKey: "AIzaSyC2EaYmUVsz6CPSF3dOVfb1JysCD1Y53ss",
  authDomain: "resumematrix-3ec74.firebaseapp.com",
  databaseURL: "https://resumematrix-3ec74-default-rtdb.firebaseio.com",
  projectId: "resumematrix-3ec74",
  storageBucket: "resumematrix-3ec74.appspot.com",
  messagingSenderId: "556933440602",
  appId: "1:556933440602:web:af3384f04103647d952463",
  measurementId: "G-F5685ZLZRC"
};
firebase.initializeApp(firebaseConfig);
export default firebase;

//const userId = 123;
//firebase.database().ref('users/' + userId).set({
//  username: "Joshua Test",
//  email: "testing@joshuaramirez.com",
//  profile_picture : "https://picsum.photos/200/300"
//});