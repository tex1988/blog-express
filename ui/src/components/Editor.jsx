import { useState } from 'react';
import styled from 'styled-components';

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
      <ButtonRow>
        <button onClick={onSaveCLick}>{saveLabel}</button>
        {useCancel && <button onClick={onCancel}>Cancel</button>}
      </ButtonRow>
    </div>
  );
};

const ButtonRow = styled.div.attrs({
  className: 'flex-row-center'
})`
  flex-basis: auto;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`

export default Editor;
