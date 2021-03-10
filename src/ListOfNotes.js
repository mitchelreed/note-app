import firebase from './firebase';
// importing a delete icon from react-icons library
import { RiDeleteBack2Line } from "react-icons/ri";




function ListOfNotes({ notesArray, displayNote }) {

	// delete a note from Firebase
	const deleteEntry = (uniqueKey) => {

		const dbRef = firebase.database().ref()

		dbRef.child(uniqueKey).remove()
		document.getElementById('bodyText').textContent = ''
	}
	
	// displaying when the note was created
	function formatDate(dateObject) {
		const parts = {
			date: dateObject.getDate(),
			month: dateObject.getMonth() + 1,
			year: dateObject.getFullYear()
		}
		return `${parts.date}/${parts.month}/${parts.year}` ;
	}
	const myDate = new Date()
	const myDateFormatted = formatDate(myDate)
	

	return (
		<>

			<div className="listOfNotesHeader">
				<h1>Saved Notes</h1>
			</div>
			<div className="listContainer">
				<ul className="listOfNotes">
					{
						// map over firebase, display saved notes in the bottom half of the app
						notesArray.map((noteData) => {
							
							// variables to simplify the following code
							const title = noteData.noteContent.titleInput
							const body = noteData.noteContent.bodyInput
							const uniqueKey = noteData.uniqueKey

							// ensures that an empty string does not get saved
							if (title !== "" && body !== "") {
								return (

									<div key={uniqueKey}>
										<li>
											<h3>
												{title}
											</h3>
												<h4 className="createdOn">created on: {myDateFormatted}</h4>
											<div className="paragraphAndDeleteContainer">
												<p className="paragraphList">
													{body}
												</p>
												
												<button 
												title="display a note" 
												className="display" 
												onClick={() => displayNote(title, body)}> 
												<p>read</p> 
												</button>
												<button 
												className="delete button" 
												onClick={() => deleteEntry(uniqueKey)} 
												title="delete a note">
													<RiDeleteBack2Line />
													</button>

											</div>
										</li>
									</div>

								)
							} else {
								return (
									<p>something</p>
								);
							}

						}).reverse()
					}

				</ul>
			</div>
		</>

	)
}

export default ListOfNotes


