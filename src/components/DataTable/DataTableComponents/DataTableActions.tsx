import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Popper from '@mui/material/Popper';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';

import actions from '../../../utils/DataTableActions';

const DataTableActions = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'DataTableActions' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const close = (): void => {
    setAnchorEl(null);
  };

  return (
    <TableCell>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <BiDotsVerticalRounded style={{ cursor: 'inherit' }} size={20} />
      </button>
      <Popper
        sx={{ padding: '0 5px' }}
        placement="right-start"
        id={id}
        open={open}
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
            <List>
              {actions.map((action, index) => {
                const { onClick, text, Icon } = action;
                //testaamista varten id
                const id = 1;
                return (
                  <div key={text}>
                    <ListItemButton onClick={() => onClick(id)}>
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
  );
};

export default DataTableActions;
