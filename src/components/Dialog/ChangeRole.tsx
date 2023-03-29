import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  DialogTitle,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from '../../api/axios';
import { roles } from '../../utils/RoleHelper';
import { UpdateUserRole } from '../../api/services/householdUsers';

interface IChangeRole {
  setOpen: Function;
  open: boolean;
  user: any;
}

const ChangeRoleDialog = ({ open, setOpen, user }: IChangeRole) => {
  const [value, setValue] = React.useState<string>(() => String(user.roleId));
  const [loading, setLoading] = React.useState(false);

  const axios = useAxios();
  const mutation = useMutation(UpdateUserRole);
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id!;

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
      roleId: Number(value),
    });

    if (response.status === 200) {
      queryClient.invalidateQueries({
        queryKey: ['household/', id, '/users'],
      });
      toast.success('Käyttäjän rooli päivitetty');
      handleClose();
      return setLoading(false);
    }
    if (response.status === 400) {
      toast.error(response.data as string);
      return setLoading(false);
    }

    toast.error('Jotain meni pieleen');
    setLoading(false);
  };

  const roleNotChanged = () => user.roleId === Number(value);

  useEffect(() => {
    setValue(String(user.roleId));
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      // onClose={handleClose}
      aria-describedby="alert-dialog"
    >
      <DialogContent>
        <DialogTitle>Muokkaa käyttäjän roolia</DialogTitle>
        <FormControl sx={{ margin: '10px 0' }} fullWidth>
          <InputLabel id="Vaihda roolia">Rooli</InputLabel>
          <Select
            labelId="ChangeRole"
            id="ChangeRoleSelect"
            value={value}
            label="Rooli"
            onChange={(e) => setValue(e.target.value)}
          >
            {roles.map((role) => {
              if (role.roleId === 1) return null;

              return (
                <MenuItem key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ marginRight: '20px', marginBottom: '10px' }}>
        <Button variant="outlined" onClick={handleClose}>
          Peruuta
        </Button>
        <Button
          disabled={roleNotChanged() || loading}
          color="primary"
          sx={{ marginLeft: '10px', width: '100px' }}
          //   className="MenuItemMainBg"
          variant="contained"
          onClick={handleAccept}
        >
          Tallenna
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

export default ChangeRoleDialog;
