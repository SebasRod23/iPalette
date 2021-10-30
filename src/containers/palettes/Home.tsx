import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import { iPalette } from '../../interfaces/palette';
import PaletteCell from '../../components/palettes/PaletteCell';

const HomePage: React.FC = () => {
  const [palettes, setPalettes] = useState<iPalette[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get<iPalette[]>('http://localhost:3001/palette/', {
        responseType: 'json',
        withCredentials: true,
      })
      .then((res) => {
        setPalettes(res.data);
      });
  }, []);

  return (
    <Grid container direction='column'>
      <Typography
        variant='h4'
        align='center'
        gutterBottom
        style={{ padding: '20px 0' }}
      >
        Your Palettes:
      </Typography>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          history.push('/create-palette');
        }}
      >
        New Palette
      </Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '20px',
          marginTop: '10px',
        }}
      >
        {palettes.map((palette) => (
          <PaletteCell palette={palette} />
        ))}
      </div>
    </Grid>
  );
};

export default HomePage;
