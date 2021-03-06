import firebase from 'firebase/app'
import 'firebase/database'

// Your web app's Firebase configuration
 const firebaseConfig = {
	apiKey: "AIzaSyCaLRA-njySSLvEYvAy5TIQha_53keFobQ",
	authDomain: "note-app-81880.firebaseapp.com",
	projectId: "note-app-81880",
	storageBucket: "note-app-81880.appspot.com",
	messagingSenderId: "159805167837",
	appId: "1:159805167837:web:740d1f57391cd2e78be334"
};

firebase.initializeApp(firebaseConfig)

export default firebase