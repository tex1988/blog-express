import React from 'react';
import Spinner from './Spinner';

const Button = ({
  label,
  onClick = () => {},
  disabled = false,
  wait = false,
  waitLabel = null,
}) => {
  return (
    <button onClick={() => (disabled = !disabled)} disabled={disabled}>
      <div className="flex-row-center">
        {wait && (
          <span style={{ marginRight: '5px' }}>
            <Spinner size="14px" color="#b2b2b2" backgroundColor="transparent" border="1px" />
          </span>
        )}
        {wait && waitLabel ? waitLabel : label}
      </div>
    </button>
  );
};

export default Button;