import React, { useState } from 'react';
import {
  Button,
  makeStyles,
  createStyles,
  TextField,
  Theme,
  Container,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router';

const formStyles = makeStyles((theme: Theme) =>
  createStyles({
    displayRows: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    displayRowsButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
  }),
);

interface PaletteFormProps {
  name: string | undefined;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  isEditing: boolean;
  method: () => Promise<void>;
}

const PaletteForm: React.FC<PaletteFormProps> = (props: PaletteFormProps) => {
  const formClasses = formStyles();

  const history = useHistory();
  const [nColors, setNColors] = useState<number>(1);

  return (
    <Container>
      <form className={formClasses.displayRows}>
        <TextField
          variant='outlined'
          label='Name:'
          onChange={(event) => {
            props.setName(event.target.value);
          }}
        />
        <TextField
          variant='outlined'
          label='Description:'
          onChange={(event) => {
            props.setDescription(event.target.value);
          }}
        />
        <TextField
          label='# Colors:'
          type='number'
          value={nColors}
          onChange={(event) => {
            setNColors(parseInt(event.target.value));
            if (parseInt(event.target.value) > props.colors.length) {
              props.setColors([...props.colors, '#000000']);
            } else {
              console.log('Here');
              props.setColors(props.colors.slice(0, nColors - 1));
            }
            console.log(props.colors);
          }}
          InputProps={{
            inputProps: {
              max: 6,
              min: 1,
            },
          }}
        />
        {props.colors.map((color, i) => (
          <TextField
            variant='outlined'
            label={'Color #' + i}
            type='color'
            onChange={(event) => {
              let temp = props.colors;
              temp[i] = event.target.value;
              props.setColors(temp);
            }}
          />
        ))}
        <div className={formClasses.displayRowsButtons}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => props.method()}
          >
            {!props.isEditing ? 'Save' : 'Update'}
          </Button>
          <Button variant='outlined' onClick={() => history.push('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PaletteForm;
