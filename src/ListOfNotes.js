import firebase from './firebase';
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaRegStickyNote } from "react-icons/fa";
import Note from './Note.js'



function ListOfNotes({ notesArray }) {

	const deleteEntry = (uniqueKey) => {

		const dbRef = firebase.database().ref()

		dbRef.child(uniqueKey).remove()
		document.getElementById('bodyText').textContent = ''
	}

	// trying to append the body of the NOTE to the TEXTAREA
	const showNote = (noteData) => {
		// click on h3 and grab the unique key value from firebase
		console.log(noteData.noteContent.bodyInput)
		
		// query select the text area and change its inner text content to be equal to the body text connected to the h3 clicked
		// document.getElementById('bodyText').textContent = noteData.noteContent.bodyInput
		return (

			<Note passToNote={noteData} />
		)
	}

	// const showNote = (noteData) => {
	// 	console.log(noteData)
	// 	return (
	// 	)
	// }

	return (
		<>

			<div className="listOfNotesHeader">
				<h1>Notes <span className="noteIcon"><FaRegStickyNote /></span> </h1>
			</div>
			<div className="listContainer">
				<ul className="listOfNotes">
					{

						notesArray.map((noteData) => {

							// ensures that an empty string does not display
							if (noteData.noteContent.titleInput !== "" && noteData.noteContent.bodyInput !== "") {

								return (

									<div key={noteData.uniqueKey}>
										<li>
											<h3  onClick={() => showNote(noteData)} >
												{noteData.noteContent.titleInput}
											</h3>
											<div className="paragraphAndDeleteContainer">
												<p>
													{noteData.noteContent.bodyInput}
												</p>
												<button className="delete button" onClick={() => deleteEntry(noteData.uniqueKey)}><RiDeleteBack2Line /></button>
											</div>
										</li>
									</div>

								)
							}

						}).reverse() // <--- displays the array in reverse order so the newest note is shown first
					}

				</ul>
			</div>
		</>

	)
}

export default ListOfNotes


