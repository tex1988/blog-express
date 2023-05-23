import { useState } from 'react';

const Editor = (props) => {
  const {
    onSave,
    onCancel,
    saveLabel = 'Save',
    initialTitle = '',
    initialContent = '',
    useTitle = false,
    useCancel = true,
  } = props;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  function onHeaderInput(event) {
    setTitle(event.target.value);
  }

  function onContentInput(event) {
    setContent(event.target.value);
  }

  function onSaveCLick() {
    onSave(content, title);
    setContent('');
    setTitle('');
  }

  return (
    <div className="flex-column">
      {useTitle && <input onChange={onHeaderInput} value={title} placeholder="Post title" />}
      <textarea className="text-area" value={content} onChange={onContentInput}></textarea>
      <div className="flex-row-center fb-auto" style={buttonsRowStyle}>
        <button onClick={onSaveCLick}>{saveLabel}</button>
        {useCancel && <button onClick={onCancel}>Cancel</button>}
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
