import React from 'react';
import Spinner from './Spinner';

const Button = ({
  label,
  onClick = () => {},
  disabled = false,
  loading = false,
  loadingLabel = null,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      <div className="flex-row-center">
        {loading && (
          <span style={{ marginRight: '5px' }}>
            <Spinner size="14px" color="#b2b2b2" backgroundColor="transparent" border="1px" />
          </span>
        )}
        {loading && loadingLabel ? loadingLabel : label}
      </div>
    </button>
  );
};

export default Button;