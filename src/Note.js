import firebase from './firebase';
import { useEffect, useState } from 'react';
import ListOfNotes from './ListOfNotes';
import { FaRegStickyNote } from "react-icons/fa";


function Note() {
	const [notesArray, setNotesArray] = useState([])
	const [titleInput, setTitleInput] = useState('')
	const [bodyInput, setBodyInput] = useState('')
	const [noteDisplay, setNoteDisplay] = useState({})
	const [readNote, setReadNote] = useState(false)
	const dbRef = firebase.database().ref()



	useEffect(() => {

		dbRef.on('value', (data) => {

			const noteData = data.val()

			const notePad = []

			for (let noteKey in noteData) {
				notePad.push({
					uniqueKey: noteKey,
					noteContent: noteData[noteKey]
				})
			}

			setNotesArray(notePad)


		})

	}, [])


	const handleChange = (event, input) => {

		input(event.target.value)
	}

	const handleClick = (event) => {
		event.preventDefault()

		setNoteDisplay('')
		const dbRef = firebase.database().ref()


		// ensures that an empty string does not get pushed to firebase
		if (titleInput !== "" && bodyInput !== "") {
			dbRef.push({ titleInput, bodyInput })
		}

		// clears the state holding whatever was captured by the handle change function above
		setTitleInput("")
		setBodyInput("")

		// clears the actual input and text area after a note is saved
		document.querySelector(".bodyText").value = ''
		document.querySelector(".noteTitle").value = ''

	}

	const handleClear = (event) => {
		event.preventDefault()

		// clears the state holding whatever was captured by the handle change function above
		setTitleInput("")
		setBodyInput("")

		// clears the actual input and text area after a note is saved
		document.querySelector(".bodyText").value = ''
		document.querySelector(".noteTitle").value = ''

	}



	const displayNote = (title, body) => {

		setNoteDisplay({
			title: title,
			body: body
		})

	}


	return (
		<>

			
			<form>
				<label htmlFor="noteTitle" className="sr-only"></label>
				<input className="noteTitle" type="text" id="noteTitle" placeholder="Note title" onChange={(event) => handleChange(event, setTitleInput)} value={noteDisplay.title} />
				<label htmlFor="bodyText" className="sr-only"></label>
				<textarea className="bodyText" id="bodyText" placeholder="Start typing..." onChange={(event) => handleChange(event, setBodyInput)} value={noteDisplay.body}>

				</textarea>
				<div className="saveClearContainer">
				<span className="noteIcon"><FaRegStickyNote /></span> 
					<button className="save" onClick={handleClick}>Save</button>
					<button className="save clear" onClick={handleClear}>Clear</button>
				</div>

			</form>

			<ListOfNotes notesArray={notesArray} displayNote={displayNote} />

		</>
	)
}

export default Note
