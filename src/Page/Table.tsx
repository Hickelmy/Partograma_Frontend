import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface Row {
  id: number;
  value: string;
}

function MaterialTable() {
  const [rows, setRows] = useState<Row[]>(Array.from({ length: 11 }, (_, index) => ({ id: index, value: (10 - index).toString() })));
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  const handleCellClick = (row: Row) => {
    setSelectedRow(row);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    rowIndex: number
  ) => {
    const newRows = [...rows];
    newRows[rowIndex].value = e.target.value;
    setRows(newRows);
    setSelectedRow(null);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ marginRight: '10px' }}>Number</span>
        {[...Array(11)].map((_, index) => (
          <span key={index} style={{ marginRight: '10px' }}>{10 - index}</span>
        ))}
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time (Hours)</TableCell>
            <TableCell align="right">Left Side</TableCell>
            <TableCell align="right">Right Side</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
          {[...Array(11)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>{10 - index}</TableCell>
              <TableCell onClick={() => handleCellClick(rows[index])}>
                {rows[index].value}
              </TableCell>
              <TableCell>
                <select
                  value={(selectedRow && selectedRow.id === index) ? selectedRow.value : '0'}
                  onChange={e => handleSelectChange(e, index)}
                >
                  {Array.from({ length: 11 }, (_, index) => (index - 5)).map(value => (
                    <option key={value} value={value.toString()}>{value}</option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ marginTop: '10px' }}>
        <span style={{ marginRight: '10px' }}>Counter (-5 to +5)</span>
        {Array.from({ length: 11 }, (_, index) => (index - 5)).map(value => (
          <span key={value} style={{ marginRight: '10px' }}>{value}</span>
        ))}
      </div>
    </div>
  );
}

export default MaterialTable;
