import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  ListItemButton,
  Divider,
} from '@mui/material';

import { AiFillPlusSquare } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { IoMdSwap, IoIosArrowForward } from 'react-icons/io';
import { MdGroupAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface INavTavsAsetukset {
  handleTabChange: Function;
  activeHousehold: any;
  handleModalOpen: Function;
  options: any;
  handleClose: Function;
}

const NavTabsAsetukset = (props: INavTavsAsetukset) => {
  const { handleTabChange, activeHousehold, handleModalOpen } = props;
  const { handleClose, options } = props;
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate(`/talous/${activeHousehold.householdId}/asetukset#general`);
    handleClose();
  };
  const navigateToMembers = () => {
    navigate(`/talous/${activeHousehold.householdId}/asetukset#members`);
    handleClose();
  };

  const navigateToHousehold = (id: number) => {
    navigate(`/talous/${id}`);
    handleClose();
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        minWidth: 250,
        bgcolor: 'background.paper',
      }}
    >
      <div aria-label="talouden hallinta">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateToHousehold(activeHousehold.householdId)}
            >
              <ListItemText
                primary={activeHousehold?.householdName || ''}
                className="MenuItemDefaultColor"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToSettings}>
              <ListItemIcon>
                <FiSettings size={20} />
              </ListItemIcon>
              <ListItemText primary="Asetukset" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={navigateToMembers}>
              <ListItemIcon>
                <MdGroupAdd size={20} />
              </ListItemIcon>
              <ListItemText primary="Lisää jäsen" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleModalOpen()}>
              <ListItemIcon>
                <AiFillPlusSquare size={20} />
              </ListItemIcon>
              <ListItemText primary="Luo talous" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              disabled={options.length === 0}
              onClick={(e) => handleTabChange(e, '1')}
            >
              <ListItemIcon>
                <IoMdSwap size={20} />
              </ListItemIcon>
              <ListItemText primary="Vaihda taloutta" />

              <ListItemIcon
                sx={{
                  minWidth: 20,
                  width: 'fit-content',
                }}
              >
                <IoIosArrowForward size={20} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default NavTabsAsetukset;
