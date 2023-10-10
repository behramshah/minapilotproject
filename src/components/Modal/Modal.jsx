import React, { useState } from 'react';

import './Modal.css';

export default function Modal({ onClose, onSubmit, data }) {
  const [len, setLen] = useState( data ? data.len : '');
  const [status, setStatus] = useState(data ? data.status : '');
  const [wkt, setWkt] = useState(data ? data.wkt : '');


  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    onSubmit({ len, status, wkt });
  };
  
  return (
    <div className='modal'>
      <form className='custom_modal_form' onSubmit={handleSubmit}>
        <label>
          Len:
          <input type='number' value={len} onChange={(e) => setLen(e.target.value)} required />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value=''>Select...</option>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
          </select>
        </label>
        <div className='modal_buttons_container'>
          <button className='custom_btn' type='submit'>Add</button>
          <button className='custom_btn_secondary' type='button' onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
