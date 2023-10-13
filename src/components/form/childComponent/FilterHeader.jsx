import React, {useRef} from 'react';

import './FilterHeader.css';

export default function FilterHeader({handleFilter, cancelFilters}) {

    const formRef = useRef();

    const onCancel = (e) => {
        formRef.current.reset();
        cancelFilters(e)
    }
  return (
    <>
    <div className='filter_container'>
        <h4>Filter by</h4>
        <form ref={formRef}>
            <label className='filter_label'>
                id: <input type='text' name='id' onChange={handleFilter}/>
            </label>
            <label className='filter_label'>
                len: <input type='text' name='len' onChange={handleFilter}/>
            </label>
            <label className='filter_label'>
                wkt: <input type='text' name='wkt' onChange={handleFilter}/>
            </label>
            <label className='filter_label'>
                status: <input type='text' name='status' onChange={handleFilter}/>
            </label>
        </form>
        <button onClick={onCancel}>Cancel all filters</button>      
    </div>
    </>
  );
}
