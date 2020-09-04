import React, {useState, useEffect, useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import io from 'socket.io-client'

const Endpoint = "http://localhost:9999"

const binder = io(Endpoint + '/data');
setInterval(function() {
  binder.emit('request', {'time': Date.now()});
}, 1000);

const profiler = io(Endpoint + '/profile')
profiler.emit('sensor_name',{'null':'None'});

function getProfile() {
  profiler.on('sensor_name',function(data) {
    console.log('get_profile', data)
    const sensor_name =  document.getElementById('sensor_name')
    const sensor_name_2 =  document.getElementById('sensor_name_2')
    const sensor_name_3 =  document.getElementById('sensor_name_3')
    const sensor_name_4 =  document.getElementById('sensor_name_4')
    console.log(data.name[0])
    sensor_name.innerHTML = data.name[0]
    sensor_name_2.innerHTML = data.name[1]
    sensor_name_3.innerHTML = data.name[2]
    sensor_name_4.innerHTML = data.name[3]
  })
}
getProfile();


setInterval( function() {
  binder.on('rtdata', function(data) {
    console.log('binder buffered: ', data)
    const target = document.getElementById('data_1')
    const target_2 = document.getElementById('data_2')
    const target_3 = document.getElementById('data_3')
    const target_4 = document.getElementById('data_4')
    console.log(target)
    target.innerHTML = data.data[0] + '\nmmAQ'
    target_2.innerHTML = data.data[1] + '\nA'
    target_3.innerHTML = data.data[2] + '\nA'
    target_4.innerHTML = data.data[3] + '\n℃'
  });} ,1000);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: theme.spacing(15)
  },
  subPaper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 20
  },
  container: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  fixedHeight: {
    padding: theme.spacing(3),
    height: 300,
  },
}));


export default function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Grid container spacing ={2}>
        <Grid item xs={12}>
          <Paper item xs={12}>
            <Typography variant="h3" color="textSecondary" align="center">
              도장부스 엣지 관제
            </Typography>
          </Paper>
          </Grid>
        <Grid item xs={6} sm={6}>
          <Paper className={classes.paper}>
          <Typography variant="body2" color="textSecondary" align="center" id="sensor_name">
              차압계
            </Typography>
              <Grid item xs={12}>
                <Paper className={classes.subPaper}>
                <Typography variant="body2" color="textSecondary" align="center" id='data_1'>
                    데이터
                  </Typography>
                </Paper>
              </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center" id="sensor_name_2">
              차압계
            </Typography>
            <Grid item xs={12}>
                <Paper className={classes.subPaper}>
                <Typography variant="body2" color="textSecondary" align="center" id='data_2'>
                    데이터
                  </Typography>
                </Paper>
              </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center" id="sensor_name_3">
              차압계
            </Typography>
            <Grid item xs={12}>
                <Paper className={classes.subPaper}>
                <Typography variant="body2" color="textSecondary" align="center" id='data_3'>
                    데이터
                  </Typography>
                </Paper>
              </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center" id="sensor_name_4">
              차압계
            </Typography>
            <Grid item xs={12}>
                <Paper className={classes.subPaper}>
                <Typography variant="body2" color="textSecondary" align="center" id='data_4'>
                    데이터
                  </Typography>
                </Paper>
              </Grid>
          </Paper>
        </Grid>
      </Grid>    
    </div>
  );
}