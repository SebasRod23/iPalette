import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { iPalette } from '../../interfaces/palette';
import { Typography } from '@material-ui/core';
import PaletteCell from '../../components/palettes/PaletteCell';

const HomePage: React.FC = () => {
  const [palettes, setPalettes] = useState<iPalette[]>([]);

  useEffect(() => {
    axios
      .get<iPalette[]>('http://localhost:3001/palette/', {
        responseType: 'json',
        withCredentials: true,
      })
      .then((res) => setPalettes(res.data));
  }, []);

  return (
    <div>
      <Typography
        variant='h4'
        align='center'
        gutterBottom
        style={{ padding: '20px 0' }}
      >
        Your Palettes:
      </Typography>
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
    </div>
  );
};

export default HomePage;
