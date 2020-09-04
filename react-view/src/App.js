import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
    padding: theme.spacing(3),
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
          <Typography variant="body2" color="textSecondary" align="center">
              차압계
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center">
              차압계
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center">
              차압계
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
        <Paper className={classes.paper}>
        <Typography variant="body2" color="textSecondary" align="center">
              차압계
            </Typography>
          </Paper>
        </Grid>
      </Grid>    
    </div>
  );
}