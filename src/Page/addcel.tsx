import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

interface Cell {
  column: number;
  row: number;
  value: number;
}

const AddCellForm: React.FC = () => {
  const [cellData, setCellData] = useState<Cell>({
    column: 0,
    row: 0,
    value: 0,
  });

  const [tableData, setTableData] = useState<Cell[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCellData(prevData => ({
      ...prevData,
      [name]: parseInt(value),
    }));
  };

  const handleAddCell = () => {
    setTableData(prevTableData => [...prevTableData, cellData]);
    setCellData({
      column: 0,
      row: 0,
      value: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:4616/api/cells', tableData);
      alert('Cells added successfully!');
    } catch (error) {
      console.error('Error adding cells:', error);
      alert('Error adding cells. Please try again.');
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Column</TableCell>
              <TableCell>Row</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((cell, index) => (
              <TableRow key={index}>
                <TableCell>{cell.column}</TableCell>
                <TableCell>{cell.row}</TableCell>
                <TableCell>{cell.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        label="Column"
        name="column"
        type="number"
        value={cellData.column}
        onChange={handleChange}
      />
      <TextField
        label="Row"
        name="row"
        type="number"
        value={cellData.row}
        onChange={handleChange}
      />
      <TextField
        label="Value"
        name="value"
        type="number"
        value={cellData.value}
        onChange={handleChange}
      />
      <Button onClick={handleAddCell}>Add Cell</Button>
      <Button onClick={handleSubmit}>Save Cells</Button>
    </div>
  );
};

export default AddCellForm;
