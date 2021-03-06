import firebase from './firebase';



function ListOfNotes({notesArray}) {

	const deleteEntry = (uniqueKey) => {
		
		const dbRef = firebase.database().ref()
	
		dbRef.child(uniqueKey).remove()
	}

	return (
		<>

			<div className="listOfNotesHeader">
				<h1>Notes</h1>
			</div>
			<div className="listContainer">
				<ul className="listOfNotes">

				{
         notesArray.map((noteData) => {
           return (

						<div key={noteData.uniqueKey}>
							<li>
							<h3>
								{noteData.noteContent.titleInput}
							</h3>
							<p>
								{noteData.noteContent.bodyInput}
							</p>
							<button className="delete button" onClick={() => deleteEntry(noteData.uniqueKey)}>Delete</button>
							</li>
						</div>
             
             )
            })
       }

				</ul>
			</div>
		</>

	)
}

export default ListOfNotes


