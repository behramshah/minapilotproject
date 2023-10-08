import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactTabulator } from 'react-tabulator';
import DeleteIcon from './childcomponents/DeleteIcon';

import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

export default function Table(props) {

    const [tableData, setTableData] = useState(props.excelData);

    useEffect(() => {
        setTableData(props.excelData);
    }, [props.excelData]); 

    const columns = [
        {title:'id', sorter:'number', field:'id', headerFilter:true},
        {title:'len',field:'len', headerFilter:true},
        {title:'wkt',field:'wkt', headerFilter:true},
        {title:'status',field:'status', headerFilter:true},
        {title:'edit',field:'edit'},
        {title:'Delete',field:'delete',
         formatter: (cell, formatterParams, onRendered) => {
            onRendered(() => {
              const onDelete = () => {
                cell.getRow().delete();
                console.log(`Row with id ${cell.getRow().getData().id} deleted.`);
              };
              const root = createRoot(cell.getElement());
              root.render(<DeleteIcon onDelete={onDelete} />);
            });
          }, 
        },
        {title:'show',field:'show'},
    ];

  return (
    <div>
        <ReactTabulator 
            data={tableData} 
            columns={columns} 
            layout={'fitDataFill'} 
            options={{ 
                pagination: 'local', 
                paginationSize: 20,
                initialSort:[{column:"id", dir:"desc"}], 
            }}/>
    </div>
  );
}
