import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from '../../api/axios';
import { DeleteUser } from '../../api/services/householdUsers';

interface IDeleteUser {
  setOpen: Function;
  open: boolean;
  user: any;
}

const DeleteUserDialog = ({ setOpen, open, user }: IDeleteUser) => {
  const axios = useAxios();
  const mutation = useMutation(DeleteUser);
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id!;

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen('');
  };

  const handleAccept = async () => {
    if (loading) return;

    setLoading(true);
    const response = await mutation.mutateAsync({
      axios,
      userId: user.userId,
      householdId: id,
    });

    if (response.status === 200) {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['household/', id, '/users'],
      });
      toast.success('Käyttäjä poistettu');
      return setLoading(false);
    }
    if (response.status === 400) {
      toast.error(response.data as string);
      return setLoading(false);
    }
    toast.error('Jotain meni pieleen');
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      // onClose={handleClose}
      aria-describedby="alert-dialog"
    >
      <DialogTitle>Haluatko varmasti poistaa käyttäjän</DialogTitle>
      <DialogActions sx={{ marginRight: '20px', marginBottom: '10px' }}>
        <Button
          sx={{
            backgroundColor: 'white',
            color: '#f44336',
            borderColor: '#f44336',
          }}
          variant="outlined"
          onClick={handleClose}
        >
          Peruuta
        </Button>
        <Button
          disabled={loading}
          sx={{
            '&:hover': { backgroundColor: '#c5372d' },
            backgroundColor: '#f44336',
            color: 'white',
            marginLeft: '10px',
            width: '100px',
          }}
          variant="contained"
          onClick={handleAccept}
        >
          Poista
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DeleteUserDialog;
