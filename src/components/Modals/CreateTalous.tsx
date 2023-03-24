import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

import { createTalous } from '../../api/services/talous';
import useAxios from '../../api/axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateTalous = ({ open, setOpen }: ICreateTalous) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const [haveError, setHaveError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const handleClose = () => setOpen(false);
  const axios = useAxios();

  const handleCreating = async () => {
    if (name.length === 0) {
      setHaveError(true);
      setErrorMessage('Nimi ei voi olla tyhjä');
      return;
    }
    if (haveError || loading) return;
    setLoading(true);
    const response = await createTalous(axios, name);

    if (response.status === 201) {
      handleClose();
      toast.success('Talous luotu');
      return setLoading(false);
    }
    if (response.status === 400) {
      toast.error(response.data as string);
      return setLoading(false);
    } else {
      console.log(response.data);
      toast.error('Jotain meni pieleen');
      setLoading(false);
    }
  };

  useEffect(() => {
    setName('');
    setErrorMessage(null);
  }, [open]);

  useEffect(() => {
    if (name.length > 30) {
      setHaveError(true);
      setErrorMessage('Talouden nimi voi olla maksimissaan 30 merkkiä');
    } else {
      setHaveError(false);
    }
  }, [name]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Luo talous modal"
      aria-describedby="Luo uusi talous"
    >
      <Box sx={style}>
        <Typography
          className="MenuItemDefaultColor"
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          Luo talous
        </Typography>
        <Divider sx={{ width: '100%', margin: '5px 0 10px 0' }} />
        <Typography component="p">Talouden nimi</Typography>
        <TextField
          helperText={errorMessage}
          error={haveError}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: '100%', marginBottom: '20px' }}
          hiddenLabel
          id="filled-hidden-label-small"
          size="small"
        />
        <Box
          sx={{
            width: 'fit-content',
            margin: '0 0 0 auto',
          }}
        >
          <Button
            disabled={loading}
            sx={{ width: '80px' }}
            className="MenuItemDefaultColor"
            variant="outlined"
            onClick={handleClose}
          >
            Sulje
          </Button>
          <Button
            disabled={loading || haveError}
            onClick={handleCreating}
            sx={{ marginLeft: '10px', width: '100px' }}
            className="MenuItemMainBg"
            variant="contained"
          >
            Luo
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

interface ICreateTalous {
  open: boolean;
  setOpen: Function;
}

export default CreateTalous;
