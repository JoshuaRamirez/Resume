import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";

const firebaseConfig = {
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
const db = firebase.database().ref();

const DataFactory = function() {
  const CreateProfile = function(profile){
    // TODO: Figure out UI flow for new profiles
    return db.push(profile).then((x)=>console.log(x));
  };
  const ReadProfile = function(id){
    
  };
  const UpdateProfile = function(profile){
    return db.set(profile);
  };
  const DeleteProfile = function(){
    // TODO: Figure out ui flow for deleting profiles
  };
  return {CreateProfile,ReadProfile,UpdateProfile,DeleteProfile};
}

const data = DataFactory();

export default data;