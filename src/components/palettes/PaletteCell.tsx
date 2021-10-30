import React from 'react';
import {
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { Card, Button } from '@mui/material';
import { useHistory } from 'react-router';
import axios from 'axios';

import { iPalette } from '../../interfaces/palette';

interface CellProps {
  palette: iPalette;
}

const cellStyles = makeStyles((_: Theme) =>
  createStyles({
    cell: {
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      minHeight: '140px',
      minWidth: '100px',
    },
    infoContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    displayRowsButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    paperContainer: {
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      columnGap: '20px',
      width: '70%',
    },
  }),
);

const PaletteCell: React.FC<CellProps> = (props: CellProps) => {
  const cellClasses = cellStyles();
  const history = useHistory();

  const DeleteThis = async () => {
    await axios(
      'http://localhost:3001/palette/' + props.palette._id + '/delete',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        responseType: 'json',
      },
    ).then((res) => {
      window.location.reload();
    });
  };
  return (
    <Card key={props.palette._id} className={cellClasses.cell} raised>
      <CardHeader
        title={props.palette.name}
        titleTypographyProps={{ align: 'center' }}
        subheader={
          <Typography paragraph align='center'>
            {props.palette.description}
          </Typography>
        }
      />
      <div className={cellClasses.infoContainer}>
        <div className={cellClasses.paperContainer}>
          {props.palette.colors.map((color) => (
            <Grid item>
              <Paper
                className={cellClasses.paper}
                style={{ backgroundColor: color }}
                variant='outlined'
              />
              <Typography variant='subtitle1' align='center'>
                {color.toLocaleUpperCase()}
              </Typography>
            </Grid>
          ))}
        </div>
        <div className={cellClasses.displayRowsButtons}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              history.push('/edit-palette/' + props.palette._id);
            }}
          >
            Edit
          </Button>
          <Button variant='contained' color='error' onClick={DeleteThis}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PaletteCell;
