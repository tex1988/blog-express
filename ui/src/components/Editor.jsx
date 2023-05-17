import { useState } from 'react';

const Editor = (props) => {
  const { onSave, onCancel, initialTitle, initialContent, useTitle } = props;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function onHeaderInput(event) {
    setTitle(event.target.value);
  }

  function onContentInput(event) {
    setContent(event.target.value);
  }

  return (
    <div className="flex-column">
      {useTitle && <input onChange={onHeaderInput} value={title} placeholder="Post title" />}
      <textarea className="text-area" value={content} onChange={onContentInput}></textarea>
      <div className="flex-row-center" style={buttonsRowStyle}>
        <button onClick={() => onSave(content, title)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

const buttonsRowStyle = {
  justifyContent: 'center',
  alignContent: 'center',
  flexWrap: 'wrap',
};

export default Editor;
