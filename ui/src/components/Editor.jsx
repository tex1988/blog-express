import { useState } from 'react';

const Editor = (props) => {
  const { onSave, onCancel, initialTitle, initialContent } = props;
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
      <input onChange={onHeaderInput} value={title} placeholder="Post title" />
      <textarea className="text-area" value={content} onChange={onContentInput}></textarea>
      <div
        className="flex-row-center"
        style={buttonsRowStyle}>
        <button onClick={() => onSave(title, content)}>Save</button>
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