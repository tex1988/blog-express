import { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from './ui/Button';

const Editor = (props) => {
  const {
    onSave,
    onCancel,
    saveLabel = 'Save',
    initialTitle = '',
    initialContent = '',
    useTitle = false,
    useCancel = true,
    loading = false,
    loadingLabel = 'Loading',
    textAreaHeight = '400px',
  } = props;
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const lastValue = useRef();

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
    lastValue.current = content;
  }

  return (
    <div className="flex-column">
      {useTitle && (
        <input
          onChange={onHeaderInput}
          value={title}
          placeholder="Post title"
        />
      )}
      <textarea
        className="text-area"
        value={loading ? lastValue.current : content}
        onChange={onContentInput}
        disabled={loading}
        style={{ height: textAreaHeight }}
      />
      <ButtonRow>
        <Button
          onClick={onSaveCLick}
          label={saveLabel}
          loading={loading}
          loadingLabel={loadingLabel}
        />
        {useCancel && !loading && <Button onClick={onCancel} label="Cancel" />}
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
