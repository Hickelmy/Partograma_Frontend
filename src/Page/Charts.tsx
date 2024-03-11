import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem } from '@mui/material';
import axios from 'axios';

interface Cell {
  id: number;
  column: number;
  row: number;
  value: number;
}

interface Row {
  indice: number;
  values: number[];
  hour: string;
}

const AgramaEditor: React.FC = () => {
  const initialHour = 10;
  const [rows, setRows] = useState<Row[]>(Array.from({ length: 10 }, (_, i) => ({
    indice: i + 1,
    values: Array(10).fill(0),
    hour: `${initialHour + i}:00`
  })));

  const [fetchData, setFetchData] = useState<boolean>(true); 

  useEffect(() => {
    if (fetchData) {
      axios.get<Cell[]>('http://localhost:4616/api/cells')
        .then(response => {
          const updatedRows = [...rows];
          response.data.forEach(cell => {
            updatedRows[cell.row].values[cell.column] = cell.value;
          });
          setRows(updatedRows);
          setFetchData(false); 
        })
        .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
        });
    }
  }, [fetchData, rows]); 

  const handleCellChange = (hourIndex: number, valueIndex: number, newValue: string) => {
    const newRows = [...rows];
    newRows[hourIndex].values[valueIndex] = parseInt(newValue) || 0;
    setRows(newRows);

    const rowData: Cell = {
      column: valueIndex,
      row: hourIndex,
      value: parseInt(newValue) || 0,
      id: Date.now(),
    };

    axios.post('http://localhost:4616/api/cells', [rowData])
      .then(response => {
        console.log('Dados enviados com sucesso:', response.data);
        setFetchData(true);
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
      });
  };

  return (
    <div>
      <h1><code>Agrama</code> editor</h1>
      <div className="left">
        <div className="table">
          <h2 className="table-title" contentEditable>Registro</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {Array.from({ length: 10 }, (_, i) => (
                    <TableCell key={i} align="center">{i}</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, hourIndex) => (
                  <TableRow key={hourIndex}>
                    <TableCell>{row.indice}</TableCell>
                    {row.values.map((value, valueIndex) => (
                      <TableCell key={valueIndex} align="center">
                        <Select
                          value={value}
                          onChange={(e) =>
                            handleCellChange(hourIndex, valueIndex, e.target.value as string)
                          }
                          sx={{ '& .MuiSelect-root': { border: 'none' } }}
                        >
                          <MenuItem value={0}>A</MenuItem>
                          <MenuItem value={1}>B</MenuItem>
                          <MenuItem value={2}>C</MenuItem>
                        </Select>
                      </TableCell>
                    ))}
                    <TableCell>{row.indice - 5}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {Array.from({ length: 10 }, (_, i) => (
                    <TableCell key={i} align="center">{initialHour + i + 10}:00</TableCell>
                  ))}
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="right">
        <h3 className="title"></h3>
        <div className="chart">
          <div className="x-axis"></div>
        </div>
        <div className="titles"></div>
        <div className="legend"></div>
      </div>
    </div>
  );
};

export default AgramaEditor;
