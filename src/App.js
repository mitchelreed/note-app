import './App.scss';

function App() {
  return (
    <div>
     <h1>something here</h1>
    </div>
  );
}

export default App;





// textarea will serve as the note writing space

// firebase will store the "saved" notes and their titles will be displayed below the textarea

  // - the "title" may need to be its own input and styled to look seamless, so that value can be captured on change and used as the note title and then put below the text area

  // - the body of the note, the "textarea" will be captured and saved into firebase as well

// the "save" button will clear the text and title area
  // - clicking on the title will let you read the note and title in the title and textarea

//  if the list of saved notes gets long, the box will be set to overflow-y scroll