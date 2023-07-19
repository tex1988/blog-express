import { forwardRef, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './ui/Button';
import { AnimatePresence, motion } from 'framer-motion';

const Editor = forwardRef(({
  onSave = () => {},
  onCancel = () => {},
  onTitleEdit = () => {},
  onContentEdit = () => {},
  saveLabel = 'Save',
  initialTitle = '',
  initialContent = '',
  useTitle = false,
  useCancel = true,
  loading = false,
  loadingLabel = 'Loading',
  textAreaHeight = '400px',
  isError = false,
}, ref) => {
  const lastContent = useRef('');
  const lastTitle = useRef('');
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isError === true) {
      setTitle(lastTitle.current);
      setContent(lastContent.current);
    }
  }, [isError]);

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
    <EditorWrapper height={textAreaHeight} error={isError} ref={ref}>
      {useTitle && (
        <input
          className="input"
          onChange={onHeaderInput}
          value={isError ? lastTitle.current : title}
          placeholder={loading ? lastTitle.current : 'Post title'}
          disabled={loading}
        />
      )}
      <textarea
        className="text-area"
        value={isError ? lastContent.current : content}
        placeholder={loading ? lastContent.current : ''}
        onChange={onContentInput}
        disabled={loading}
      />

      <motion.div className="flex-row-center button-row">
        <AnimatePresence initial={false}>
            <motion.div
              layout={'position'}
              key='editor_save'
              transition={{ layout: { duration: 0.1 } }}>
              <Button
                onClick={onSaveCLick}
                label={saveLabel}
                loading={loading}
                loadingLabel={loadingLabel}
              />
            </motion.div>
            {useCancel && !loading && (
              <motion.div
                layout={'position'}
                key='editor_cancel'
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}>
                <Button onClick={onCancel} label='Cancel' />
              </motion.div>
            )}
        </AnimatePresence>
      </motion.div>
    </EditorWrapper>
  );
});

const EditorWrapper = styled.div.attrs({
  className: 'flex-column',
})`
  .button-row {
    flex-basis: auto;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .input {
    ${(props) =>
      props.error &&
      css`
        border-color: #ce352c;

        &:focus {
          border-color: #ce352c;
        }
      `}
  }

  .text-area {
    height: ${(props) => props.height};
    
    ${(props) =>
      props.error &&
      css`
        border-color: #ce352c;

        &:focus {
          border-color: #ce352c;
        }
      `}
  }
`;

export default Editor;
