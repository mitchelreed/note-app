import firebase from './firebase';
import { useEffect, useState } from 'react';
import ListOfNotes from './ListOfNotes';
// importing a note icon from react-icons library
import { FaRegStickyNote } from "react-icons/fa";
import formatDate from './dateAndTime'

function Note() {

	const [notesArray, setNotesArray] = useState([])
	const [titleInput, setTitleInput] = useState('')
	const [bodyInput, setBodyInput] = useState('')
	const [noteDisplay, setNoteDisplay] = useState({})
	const [errorDisplay, setErrorDisplay] = useState('')

	const dbRef = firebase.database().ref()


	useEffect(() => {

		// accessing firebase and pulling data to send to setNotesArray
		dbRef.on('value', (data) => {

			const noteData = data.val()
			const notePad = []


			for (let noteKey in noteData) {
				notePad.push({
					uniqueKey: noteKey,
					noteContent: noteData[noteKey],
					timeStamp: noteData[noteKey].timeStamp
				})
			}

			setNotesArray(notePad)

		})

	}, [dbRef])


	const handleChange = (event, input) => {
		input(event.target.value)
	}

	const handleClick = (event) => {
		event.preventDefault()
		// clear error
		setErrorDisplay('')
		// clear note display
		setNoteDisplay('')

		const dbRef = firebase.database().ref()
		// time stamp to be pushed
		const timeStamp = formatDate()

		// ensures that an empty string does not get pushed to firebase
		if (titleInput !== "" && bodyInput !== "") {
			dbRef.push({ titleInput, bodyInput, timeStamp })
		} else if (titleInput === "Hello?" || titleInput === "Hello") {

			setErrorDisplay('Hi there....teehee')
			setTimeout(() => {
				setErrorDisplay('')
			}, 1500)

		
		}
		else {
			setErrorDisplay('please enter a full note 📓 🙂')
			setTimeout(() => {
				setErrorDisplay('')
			}, 3000)
		}

		// clears the state holding whatever was captured by the handle change function above
		setTitleInput("")
		setBodyInput("")

		// clears the actual input and text area after a note is saved
		document.querySelector(".bodyText").value = ''
		document.querySelector(".noteTitle").value = ''

		document.getElementById('bodyText').style.display = 'inline-block'
		document.getElementById('noteTitle').style.display = 'inline-block'
		document.getElementById('displayANote').style.display = 'none'

	}

	const handleClear = (event) => {
		event.preventDefault()
		// clear error
		setErrorDisplay('')
		// clear note display
		setNoteDisplay('')
		// clears the state holding whatever was captured by the handle change function above
		setTitleInput("")
		setBodyInput("")

		// clears the actual input and text area after a note is saved
		document.querySelector(".bodyText").value = ''
		document.querySelector(".noteTitle").value = ''
		// css alterations in order to display the note when a user "reads" a saved note
		document.getElementById('bodyText').style.display = 'block'
		document.getElementById('noteTitle').style.display = 'block'
		document.getElementById('displayANote').style.display = 'none'
	}



	const displayNote = (title, body) => {
		// this will display an already saved note
		setNoteDisplay({
			title: title,
			body: body
		})

		// css alterations in order to display the note when a user "reads" a saved note
		document.getElementById('bodyText').style.display = 'none'
		document.getElementById('noteTitle').style.display = 'none'
		document.getElementById('displayANote').style.display = 'block'

	}


	return (
		<>
			<p className="error">{errorDisplay}</p>
			<form>
				<div className="displayANote" id="displayANote">
					<h3 className="displayTitle">{noteDisplay.title}</h3>
					<p className="displayBody">{noteDisplay.body}</p>
				</div>
				<label htmlFor="noteTitle" className="sr-only"></label>
				<input className="noteTitle" type="text" id="noteTitle" placeholder="Note title" onChange={(event) => handleChange(event, setTitleInput)} />
				<label htmlFor="bodyText" className="sr-only"></label>
				<textarea className="bodyText" id="bodyText" placeholder="Start typing..." onChange={(event) => handleChange(event, setBodyInput)} >

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
