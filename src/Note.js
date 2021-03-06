import firebase from './firebase';
import { useEffect, useState } from 'react';
import ListOfNotes from './ListOfNotes';

function Note(){

	const [notesArray, setNotesArray] = useState([])
	const [titleInput, setTitleInput] = useState('')
	const [bodyInput, setBodyInput] = useState('')
  // const [noteInput, setNoteInput] = useState({title: '', noteBody: ''})
  // const [noteInput, setTitleInput] = useState({})
	const dbRef = firebase.database().ref()

  useEffect(() => {

    dbRef.on('value', (data) => {

      const noteData = data.val()
      

      const notePad = []

      for(let noteKey in noteData) {
        notePad.push({ 
					uniqueKey: noteKey,
					noteContent: noteData[noteKey]
        })
      }

      setNotesArray(notePad)
		
    })

  },[])


	const handleChange = (event, input) => {
		
		input(event.target.value)

	}

	const handleClick = (event) => {
   
		const dbRef = firebase.database().ref()
    event.preventDefault()

    dbRef.push({titleInput, bodyInput})

		document.querySelector(".bodyText").value = ''
		document.querySelector(".noteTitle").value = ''
  }
	

	return(

		<>
			<form>
				<button className="save button" onClick={handleClick}>Save</button>
				<label htmlFor="noteTitle" className="sr-only"></label>
				<input className="noteTitle" type="text" id="noteTitle" placeholder="Note title"  onChange={(event) => handleChange(event, setTitleInput)}/>
				<label htmlFor="bodyText" className="sr-only"></label>
				<textarea className="bodyText" id="bodyText" placeholder="start typing..."  onChange={(event) => handleChange(event, setBodyInput)}>
					
				</textarea>
			</form>
			<ListOfNotes notesArray={notesArray}/>
		</>
	)
}

export default Note 