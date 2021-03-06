import './App.scss';
import firebase from './firebase';
import Note from './Note.js';
import ListOfNotes from './ListOfNotes.js'
// import { useEffect, useState } from 'react'

// const dbRef = firebase.database().ref()

function App() {

  return (
    <div>

      <main className="notesContainer">
        <Note />
        {/* <ListOfNotes /> */}
      </main>

    </div>
  );
}

export default App;

