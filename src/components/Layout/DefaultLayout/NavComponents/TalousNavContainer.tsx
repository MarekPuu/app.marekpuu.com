import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import TalouseMenu from './TalousMenu';

const options = ['Marekin ja lauran talous', 'Marekin Talous', 'Joku talous'];

const LayoutMenu = () => {
  const [tab, setTab] = React.useState('0');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setTab('0');
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <div>
      <List
        className="MenuItemSecondaryBg"
        sx={{
          maxWidth: 360,
          minWidth: 250,
          color: 'white',
          padding: 0,
          borderRadius: 1,
          cursor: 'pointer',
        }}
        component="div"
        aria-label="Talouden asetukset"
      >
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Taloudet"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={options[selectedIndex]} />
          <ListItemIcon
            sx={{
              minWidth: 25,
            }}
          >
            <IoIosArrowDown size={25} color="white" />
          </ListItemIcon>
        </ListItem>
      </List>
      <TalouseMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        tab={tab}
        selectedIndex={selectedIndex}
        handleTabChange={handleTabChange}
        options={options}
        handleMenuItemClick={handleMenuItemClick}
      />
    </div>
  );
};

export default LayoutMenu;
