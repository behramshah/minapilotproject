import React, { useState } from 'react';

import './Modal.css';

export default function Modal({ onClose }) {
  const [len, setLen] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Len: ${len}, Status: ${status}`);
    onClose();
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
