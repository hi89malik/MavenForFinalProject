import React from 'react';

export function IconButton({ onPress, variant, children, 'aria-label': ariaLabel, isDisabled, ...props }) {
  const style = {
    padding: '8px',
    margin: '5px',
    border: '1px solid transparent',
    borderRadius: '50%',
    cursor: onPress && !isDisabled ? 'pointer' : 'default',
    backgroundColor: variant === 'primary' && !isDisabled ? '#007bff' : 'transparent',
    color: variant === 'primary' && !isDisabled ? 'white' : 'black',
    opacity: isDisabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 0,
  };
  return (
    <button onClick={isDisabled ? undefined : onPress} style={style} aria-label={ariaLabel} disabled={isDisabled} {...props}>
      {children}
    </button>
  );
}