import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Table from '../table/Table';
import Modal from '../Modal/Modal';
import PieChart from '../charts/piechart/PieChart';
import VerticalChart from '../charts/verticalchart/VerticalChart';
import FilterHeader from './childComponent/FilterHeader';

import './MyUploadComponent.css';

export default function MyUploadComponent() {

  const [excelFile, setExcelFile ] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showPie, setShowPie] = useState(false);
  const [showVertical, setShowVertical] = useState(false);
  const [chartdata, setChartData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    setChartData(excelData);
  }, [excelData]);

  const handleAnalizeOne = () => {
    setChartData(excelData);
    setShowPie(!showPie);
  };

  const handleAnalizeTwo = () => {
    setShowVertical(!showVertical);
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
      setOriginalData(data);
      setExcelData(data);
    }
  }
  
  const handleButtonClick = () => {
    setShowModal(true);
  }; 

  const handleNewData = (newData) => {
    let newExceldata;
    if(editId) {
      const newRow = { id: editId, ...newData };
      newExceldata = excelData.filter((row) => row.id !== editId);
      newExceldata = [...originalData, newRow];
      setExcelData(newExceldata);
      setEditId(null);
    } else {
      const highestId = Math.max(...excelData.map((row) => row.id));
      const newRow = { id: highestId + 1, ...newData };
      newExceldata = [...originalData, newRow];
      setExcelData(newExceldata);
    }
    setOriginalData(newExceldata);
  };
  
  const handleDeleteData = (id) => {
    const newExceldata = excelData.filter((row) => row.id !== id);
    setExcelData(newExceldata);
    setOriginalData(newExceldata);
  };
  

  const handleShowMap = (wkt) => {
    console.log(wkt);
  }

  const handleFilter = (e) => {
    e.preventDefault();
    if(originalData){
      let filteredData = null;
      switch(e.target.name){
        case 'id':
          filteredData = originalData.filter((item) => String(item.id).includes(String(e.target.value)));
          setExcelData(filteredData);
          break;
      case 'len':
        filteredData = originalData.filter((item) => String(item.len).includes(String(e.target.value)));
        setExcelData(filteredData);
        break;
      case 'wkt':
        filteredData = originalData.filter((item) => String(item.wkt).includes(String(e.target.value)));
        setExcelData(filteredData);
        break;
      case 'status':
        filteredData = originalData.filter((item) => String(item.status).includes(String(e.target.value)));
        setExcelData(filteredData);
        break;
        default: console.log('No filters applied');
      }
    }
  }

  const cancelFilters = (e) => {
    setExcelData(originalData);
  }

  return (
    <>
      <div className='upload_container'>        
        <form id='file_form' onSubmit={handleFileSubmit}>
          <input className='custom-file-input' type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' required onChange={handleFile}/>
        </form>
        {excelData ? <button className='custom_btn' onClick={handleButtonClick}>Add New Data</button> : null}
      </div>
      {showModal ? <Modal data={modalData} onClose={() => { setShowModal(false); setModalData(null);}} onSubmit={handleNewData} /> : null}
      <FilterHeader handleFilter={handleFilter} cancelFilters={cancelFilters}/>
      <Table excelData={excelData} onEditData={handleEditData} onDeleteData={handleDeleteData} onShowMap={handleShowMap}/>
      {
        excelData ? 
          <div className='analize_buttons_container'>
            <button className='custom_btn' onClick={handleAnalizeOne}>Analiz 1</button>
            <button className='custom_btn' onClick={handleAnalizeTwo}>Analiz 2</button>
          </div> : null
      }
      <div className='charts_container'>
        {showPie ? <PieChart excelData={chartdata}/> : null}      
        {showVertical ? <VerticalChart excelData={chartdata}/> : null}      
      </div>
    </>
  );
}