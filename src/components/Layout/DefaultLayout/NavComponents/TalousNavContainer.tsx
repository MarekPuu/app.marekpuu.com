import React, { useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import TalouseMenu from './TalousMenu';
import CreateTalousModal from '../../../Modals/CreateHousehold';
import { useAxios } from '../../../../api/axios';
import { useQuery } from 'react-query';
import { getMyHouseholds } from '../../../../api/services/household';
import { useNavigate, useParams } from 'react-router-dom';
import { ListItemButton } from '@mui/material';

const LayoutMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [tab, setTab] = React.useState('0');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const axios = useAxios();

  const { isLoading, error, data } = useQuery('myHouseholds', () =>
    getMyHouseholds(axios)
  );

  const activeHousehold = data?.data?.find((h: any) => id === h.householdId);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTab('0');
  };

  const handleMenuItemClick = (id: number) => {
    setTab('1');
    setAnchorEl(null);
    navigate(`/talous/${id}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  const handleModalOpen = () => {
    setIsOpenModal(true);
    handleClose();
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
        <ListItemButton onClick={handleClickListItem} sx={{ height: '50px' }}>
          <ListItem
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Taloudet"
            aria-expanded={open ? 'true' : undefined}
          >
            <ListItemText
              primary={activeHousehold?.householdName || 'Valitse talous'}
            />

            <ListItemIcon
              sx={{
                minWidth: 25,
              }}
            >
              <IoIosArrowDown size={25} color="white" />
            </ListItemIcon>
          </ListItem>
        </ListItemButton>
      </List>
      <TalouseMenu
        activeHousehold={activeHousehold}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        tab={!id ? '1' : tab}
        showBackOption={id ? true : false}
        handleTabChange={handleTabChange}
        options={data?.data}
        handleMenuItemClick={handleMenuItemClick}
        handleModalOpen={handleModalOpen}
      />
      <CreateTalousModal open={isOpenModal} setOpen={setIsOpenModal} />
    </div>
  );
};

export default LayoutMenu;
