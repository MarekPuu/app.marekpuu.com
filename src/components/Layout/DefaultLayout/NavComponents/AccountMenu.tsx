import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout, user } = useAuth0();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const fullName = `${user?.given_name || 'Ei'} ${
    user?.family_name || 'Nimeä'
  }`;
  const initials = `${user?.given_name?.charAt(0) || ''}${
    user?.family_name?.charAt(0) || ''
  }`;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () => {
    handleClose();
    navigate('/profiili');
  };

  const logOut = () => {
    handleClose();
    logout();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Käyttäjän asetukset">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              className="MenuItemSecondaryBg"
              sx={{ width: 50, height: 50 }}
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: '250px',
            maxWidth: '400px',
            borderRadius: 1,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'left',
            height: '60px',
          }}
        >
          <Avatar
            className="MenuItemSecondaryBg"
            sx={{ width: '50px', height: '50px', margin: 'auto', ml: 1 }}
          >
            {!!initials || user?.email?.[0].toUpperCase()}
          </Avatar>
          <List>
            <ListItemText
              className="MenuItemDefaultColor"
              sx={{ ml: 3, mr: 3 }}
              secondary={user?.email}
              primary={fullName}
            />
          </List>
        </Box>
        <Divider />
        <List>
          <ListItem sx={{ padding: '5px 0' }}>
            <ListItemButton onClick={openProfile}>
              <ListItemIcon>
                <FaUser />
              </ListItemIcon>
              Oma profiili
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem sx={{ padding: '5px 0 0 0' }}>
            <ListItemButton onClick={logOut}>
              <ListItemIcon>
                <FiLogOut />
              </ListItemIcon>
              Kirjaudu ulos
            </ListItemButton>
          </ListItem>
        </List>
      </Menu>
    </React.Fragment>
  );
}
