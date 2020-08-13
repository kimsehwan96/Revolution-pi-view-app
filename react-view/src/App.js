import React, {useState, useEffect, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, value) {
  return {name, value};
}

const rows = [
  createData('차압계', 159),
  createData('배풍기', 237),
  createData('송풍기', 262),
  createData('온도', 305),
];

export default function App() {
  const classes = useStyles();
  const collectData = useState()
  
  useEffect(() => {
    fetch('http://localhost:5000/api/data', {
      method: 'GET',
      mode: 'cors'
    }).then(resp => {
      return resp.json();
    }).then(data => {
      collectData(data);
    });
  }, [])

  /* 위 부분은 flask API 호출 부분, 현재는 랜덤값을 리턴해준다 -> 수정 필요 */

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field Name </TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* TODO : fetch 해서 받은 데이터 테이블에 뿌려주기 */