import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Table from '../table/Table';
import Modal from '../Modal/Modal';

import './MyUploadComponent.css';

export default function MyUploadComponent() {

  const [excelFile, setExcelFile ] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if(selectedFile){
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile);
      fileReader.onload=(e)=>{
        const fileData = e.target.result;
        setExcelFile(fileData);
        handleFileSubmit(fileData);
      }
    }
  };
  
  const handleFileSubmit = (fileData) => {
    if(fileData !== null){
      const workbook = XLSX.read(fileData, {type: 'buffer'});
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data);
    }
  }
  
  const handleButtonClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className='upload_container'>        
        <form id='file_form' onSubmit={handleFileSubmit}>
          <input className='custom-file-input' type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' required onChange={handleFile}/>
        </form>
        {excelData ? <button className='custom_btn' onClick={handleButtonClick}>Add New Data</button> : null}
      </div>
      {showModal ? <Modal onClose={() => setShowModal(false)} /> : null}
      <Table excelData={excelData}/>
    </>
  );
}