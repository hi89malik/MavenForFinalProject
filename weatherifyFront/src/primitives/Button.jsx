import React from 'react';

export function Button({ onPress, variant, children, ...props }) {
  const style = {
    padding: '10px 15px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: onPress && !props.disabled ? 'pointer' : 'default',
    backgroundColor: variant === 'primary' ? '#007bff' : '#eee',
    color: variant === 'primary' ? 'white' : 'black',
    opacity: props.disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  };
  return (
    <button onClick={props.disabled ? undefined : onPress} style={style} disabled={props.disabled} {...props}>
      {children}
    </button>
  );
}