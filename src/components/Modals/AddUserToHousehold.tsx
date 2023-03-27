import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from '../../api/axios';
import { AddUser } from '../../api/services/householdUsers';

const AddUserToHousehold = ({ setOpen, open }: IAddUserToHousehold) => {
  const params = useParams();
  const id = params?.id!;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [haveError, setHaveError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  const handleClose = () => setOpen(false);
  const axios = useAxios();
  const mutation = useMutation(AddUser);
  const queryClient = useQueryClient();

  const handleCreating = async () => {
    if (email.length === 0) {
      setHaveError(true);
      setErrorMessage('Sähköposti ei voi olla tyhjä');
      return;
    }

    if (haveError || loading) return;

    setLoading(true);
    const response = await mutation.mutateAsync({ axios, email, id });

    if (response.status === 201) {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['household/', id, '/users'],
      });
      toast.success('Käyttäjä lisätty');
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
    setEmail('');
    setErrorMessage(null);
    setHaveError(false);
  }, [open]);

  useEffect(() => {
    if (haveError && email.length > 0) setHaveError(false);
  }, [email]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Lisää käyttäjä modal"
      aria-describedby="Lisää käyttäjä"
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
          Lisää käyttäjä
        </Typography>
        <Divider sx={{ width: '100%', margin: '5px 0 10px 0' }} />
        <Typography component="p">Käyttäjän sähköposti</Typography>
        <TextField
          value={email}
          helperText={errorMessage}
          error={haveError}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: '100%', marginBottom: '20px' }}
          hiddenLabel
          id="email"
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
            Lisää
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

interface IAddUserToHousehold {
  open: boolean;
  setOpen: Function;
}

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

export default AddUserToHousehold;
