import firebase from './firebase';
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaRegStickyNote } from "react-icons/fa";



function ListOfNotes({ notesArray }) {

	const deleteEntry = (uniqueKey) => {

		const dbRef = firebase.database().ref()

		dbRef.child(uniqueKey).remove()
	}
	
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
							if(noteData.noteContent.titleInput !== "" && noteData.noteContent.bodyInput !== ""){



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
												<button className="delete button" onClick={() => deleteEntry(noteData.uniqueKey)}><RiDeleteBack2Line /></button>
											</div>
										</li>
									</div>
								
								)
							}

							
						})
					}
				
				</ul>
			</div>
		</>

	)
}

export default ListOfNotes


