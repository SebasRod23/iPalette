import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import PaletteForm from '../../components/palettes/PaletteForm';
import { Typography } from '@material-ui/core';
import Spinner from '../../components/Spinner';

const CreatePage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [colors, setColors] = useState<string[]>(['#000000']);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const Save = async () => {
    setLoading(true);
    await axios('http://localhost:3001/palette/add', {
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
          <Typography variant='h5' gutterBottom>
            Create new Palette
          </Typography>
          <PaletteForm
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            colors={colors}
            setColors={setColors}
            isEditing={false}
            method={Save}
          />
        </>
      )}
    </div>
  );
};

export default CreatePage;
