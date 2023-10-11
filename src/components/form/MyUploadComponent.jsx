import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Table from '../table/Table';
import Modal from '../Modal/Modal';
import PieChart from '../charts/PieChart';

import './MyUploadComponent.css';

export default function MyUploadComponent() {

  const [excelFile, setExcelFile ] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showPie, setShowPie] = useState(false);
  const [chartdata, setChartData] = useState(null);

  useEffect(() => {
    setChartData(excelData);
  }, [excelData]);

  const handleAnalizeOne = () => {
    setChartData(excelData);
    setShowPie(!showPie);
  };

  const handleEditData = (data) => {
    setEditId(data.id);
    setModalData({ len: data.len, status: data.status, wkt: data.wkt });
    setShowModal(true);
  };  

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

  const handleNewData = (newData) => {
    if(editId) {
      const newRow = { id: editId, ...newData };
      const newExceldata = excelData.filter((row) => row.id !== editId);
      setExcelData([...newExceldata, newRow]);
      setEditId(null);
    } else {
      const highestId = Math.max(...excelData.map((row) => row.id));
      const newRow = { id: highestId + 1, ...newData };
      setExcelData(prevExcelData => [...prevExcelData, newRow]);
    }
  };
  

  const handleDeleteData = (id) => {
    setExcelData(excelData.filter((row) => row.id !== id));
  };  

  return (
    <>
      <div className='upload_container'>        
        <form id='file_form' onSubmit={handleFileSubmit}>
          <input className='custom-file-input' type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' required onChange={handleFile}/>
        </form>
        {excelData ? <button className='custom_btn' onClick={handleButtonClick}>Add New Data</button> : null}
      </div>
      {showModal ? <Modal data={modalData} onClose={() => { setShowModal(false); setModalData(null);}} onSubmit={handleNewData} /> : null}
      <Table excelData={excelData} onEditData={handleEditData} onDeleteData={handleDeleteData}/>
      {
        excelData ? 
          <div className='analize_buttons_container'>
            <button className='custom_btn' onClick={handleAnalizeOne}>Analiz 1</button>
            <button className='custom_btn'>Analiz 2</button>
          </div> : null
      }
      <div className='charts_container'>
        {showPie ? <PieChart excelData={chartdata}/> : null}      
      </div>
    </>
  );
}