import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import { Typography } from '@material-ui/core';

import PaletteForm from '../../components/palettes/PaletteForm';
import Spinner from '../../components/Spinner';
import { iPalette } from '../../interfaces/palette';

const UpdatePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [colors, setColors] = useState<string[]>(['#000000']);
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const paletteId = location.pathname.split('/')[2];
    axios
      .get<iPalette>('http://localhost:3001/palette/' + paletteId, {
        responseType: 'json',
        withCredentials: true,
      })
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setColors(res.data.colors);
        setId(res.data._id);
      });
    // eslint-disable-next-line
  }, []);

  const Update = async () => {
    setLoading(true);
    await axios('http://localhost:3001/palette/' + id + '/update', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        name,
        description,
        colors,
      },
      withCredentials: true,
      responseType: 'json',
    }).then(
      (res) => {
        history.push('/home');
      },
      (err) => {
        setLoading(false);
        setName('');
        setDescription('');
        setColors([]);
        return;
      },
    );
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant='h5' gutterBottom align='center'>
            Edit this palette
          </Typography>
          <PaletteForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            colors={colors}
            setColors={setColors}
            isEditing={true}
            method={Update}
          />
        </>
      )}
    </div>
  );
};

export default UpdatePage;
