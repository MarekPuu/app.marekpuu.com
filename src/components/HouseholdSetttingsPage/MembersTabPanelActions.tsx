import {
  List,
  ListItemButton,
  ClickAwayListener,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import TableCell from '@mui/material/TableCell';
import React, { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import actions from '../../utils/MembersTableActions';
import ChangeRole from '../Dialog/ChangeRole';
import DeleteUserDialog from '../Dialog/DeleteUser';

interface IMembersTabPanelActions {
  isAdmin: boolean;
  user: any;
}

const MembersTabPanelActions = ({ isAdmin, user }: IMembersTabPanelActions) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [dialog, setDialog] = useState<string>('');

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'DataTableActions' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const close = (): void => {
    setAnchorEl(null);
  };

  const isDisabled = (): boolean => {
    return user.roleId === 1 || !isAdmin || user.userId === 3;
  };
  return (
    <>
      <TableCell>
        <button aria-describedby={id} type="button" onClick={handleClick}>
          <BiDotsVerticalRounded style={{ cursor: 'inherit' }} size={20} />
        </button>
        <Popper
          sx={{ padding: '0 5px' }}
          placement="right-start"
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
        >
          <Paper elevation={3}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 250,
                minWidth: 200,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <List sx={{ padding: '0' }}>
                {actions.map((action, index) => {
                  const { text, Icon } = action;
                  return (
                    <div key={text}>
                      <ListItemButton
                        disabled={isDisabled()}
                        onClick={() => setDialog(text)}
                      >
                        <ClickAwayListener onClickAway={close}>
                          <ListItem disablePadding>
                            <ListItemIcon>
                              <Icon size={20} />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItem>
                        </ClickAwayListener>
                      </ListItemButton>
                      {index === actions.length - 1 ? null : <Divider />}
                    </div>
                  );
                })}
              </List>
            </Box>
          </Paper>
        </Popper>
      </TableCell>
      <DeleteUserDialog
        user={user}
        open={dialog === 'Poista'}
        setOpen={setDialog}
      />
      <ChangeRole user={user} open={dialog === 'Muokkaa'} setOpen={setDialog} />
    </>
  );
};

export default MembersTabPanelActions;
