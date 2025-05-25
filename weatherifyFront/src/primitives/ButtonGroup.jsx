import React from 'react';

export function ButtonGroup({ align, children }) {
  const style = {
    display: 'flex',
    justifyContent: align === 'justify' ? 'space-between' : 'flex-start',
  };
  return <div style={style}>{children}</div>;
}