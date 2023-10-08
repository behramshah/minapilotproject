import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Table from '../table/Table';

import './MyUploadComponent.css';

export default function MyUploadComponent() {

  const [excelFile, setExcelFile ] = useState(null);
  const [excelData, setExcelData] = useState(null);

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

  

  return (
    <>
      <div className='upload_container'>        
        <form id='file_form' onSubmit={handleFileSubmit}>
          <input className='custom-file-input' type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' required onChange={handleFile}/>
        </form>
      </div>
      <Table excelData={excelData}/>
    </>
  );
}