import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './ui/Button';

const Editor = ({
  onSave = () => {},
  onCancel = () => {},
  onTitleEdit = () => {},
  onContentEdit = () => {},
  saveLabel = 'Save',
  initialTitle = '' ,
  initialContent = '',
  useTitle = false,
  useCancel = true,
  loading = false,
  loadingLabel = 'Loading',
  textAreaHeight = '400px',
  isError = false
}) => {
  const lastContent = useRef('');
  const lastTitle = useRef('');
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if(isError === true) {
      setTitle(lastTitle.current);
      setContent(lastContent.current);
    }
  }, [isError])

  function onHeaderInput(event) {
    onTitleEdit();
    setTitle(event.target.value);
  }

  function onContentInput(event) {
    onContentEdit();
    setContent(event.target.value);
  }

  function onSaveCLick() {
    onSave(content, title);
    setContent('');
    setTitle('');
    lastContent.current = content;
    lastTitle.current = title;
  }

  return (
    <div className="flex-column">
      {useTitle && (
        <InputWrapper
          onChange={onHeaderInput}
          value={isError ? lastTitle.current : title}
          placeholder={loading ? lastTitle.current : "Post title"}
          disabled={loading}
          error={isError}
        />
      )}
      <TextAreaWrapper
        className="text-area"
        value={isError ? lastContent.current : content}
        placeholder={loading ? lastContent.current : ''}
        onChange={onContentInput}
        disabled={loading}
        height={textAreaHeight}
        error={isError}
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
  className: 'flex-row-center',
})`
  flex-basis: auto;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
`;

const TextAreaWrapper = styled.textarea`
  height: ${(props) => props.height};

  ${(props) =>
    props.error &&
    css`
      border-color: #ce352c;

      &:focus {
        border-color: #ce352c;
      }
    `}
`;

const InputWrapper = styled.input`
  ${(props) =>
    props.error &&
    css`
      border-color: #ce352c;

      &:focus {
        border-color: #ce352c;
      }
    `}
`;

export default Editor;
