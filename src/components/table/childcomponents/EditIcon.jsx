import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'

export default function EditIcon({ onEdit }) {
  return <FontAwesomeIcon icon={faPen} onClick={onEdit} />;
}
