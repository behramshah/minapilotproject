import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function ShowIcon({ onShow }) {
  return <FontAwesomeIcon icon={faLocationDot} onClick={onShow} />;
}