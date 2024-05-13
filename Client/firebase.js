import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
