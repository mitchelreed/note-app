import firebase from './firebase';
import { RiDeleteBack2Line } from "react-icons/ri";




function ListOfNotes({ notesArray, displayNote }) {

	const deleteEntry = (uniqueKey) => {

		const dbRef = firebase.database().ref()

		dbRef.child(uniqueKey).remove()
		document.getElementById('bodyText').textContent = ''
	}

	return (
		<>

			<div className="listOfNotesHeader">
				<h1>Saved Notes</h1>
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
											
												
												<h3>
													{noteData.noteContent.titleInput}
												</h3>
										
										
											<div className="paragraphAndDeleteContainer">
												<p>
													{noteData.noteContent.bodyInput}
												</p>
												<button title="display a note" className="display" onClick={()=> displayNote(noteData.noteContent.titleInput, noteData.noteContent.bodyInput )}> <p>read</p> </button>
												<button className="delete button" onClick={() => deleteEntry(noteData.uniqueKey)} title="delete a note"><RiDeleteBack2Line /></button>
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


