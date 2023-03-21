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

const options = ['Marekin ja lauran talous', 'Marekin Talous', 'Joku talous'];

interface INavTavsAsetukset {
  handleTabChange: Function;
  selectedIndex: number;
}

const NavTabsAsetukset = ({
  handleTabChange,
  selectedIndex,
}: INavTavsAsetukset) => {
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
            <ListItemButton>
              <ListItemText
                primary={options[selectedIndex]}
                className="MenuItemDefaultColor"
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton href="talous/13123/asetukset">
              <ListItemIcon>
                <FiSettings size={20} />
              </ListItemIcon>
              <ListItemText primary="Asetukset" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
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
            <ListItemButton>
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
