import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from '../../api/axios';
import { deleteHousehold } from '../../api/services/household';

interface IDeleteUser {
  setOpen: Function;
  open: boolean;
}

const DeleteHouseholdDialog = ({ setOpen, open }: IDeleteUser) => {
  const axios = useAxios();
  const mutation = useMutation(deleteHousehold);
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id!;

  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async () => {
    if (loading) return;

    setLoading(true);
    const response = await mutation.mutateAsync(
      { axios, id },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: ['myHouseholds'],
          }),
      }
    );

    if (response.status === 200) {
      handleClose();
      toast.success('Talous poistettu');
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
      onClose={handleClose}
      aria-describedby="alert-dialog"
    >
      <DialogTitle>Haluatko varmasti poistaa talouden?</DialogTitle>
      <DialogContent>
        <Typography>Tätä toimintoa ei voi peruuttaa</Typography>
      </DialogContent>
      <DialogActions>
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
            '&:hover': { backgroundColor: '#e61717' },
            backgroundColor: '#FF0000',
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

export default DeleteHouseholdDialog;
