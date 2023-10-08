import React from 'react';

export default function DeleteIcon({onDelete}) {
  return (
    <i className="fa fa-trash" onClick={onDelete}></i>
  );
}