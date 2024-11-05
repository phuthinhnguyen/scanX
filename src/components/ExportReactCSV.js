import React from 'react'
import { CSVLink } from 'react-csv'
// import Button from 'react-bootstrap/Button';

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
     
            <CSVLink data={csvData} filename={fileName} className='csvbutton'>Export .xlsx</CSVLink>
    
    )
}