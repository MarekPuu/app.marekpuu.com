import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoIosArrowBack } from 'react-icons/io';

const NavTabsTaloudet = ({
  options,
  activeHousehold,
  handleMenuItemClick,
  handleTabChange,
}: INavTabsTaloudet) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        minWidth: 250,
      }}
    >
      <ListItem disablePadding>
        <ListItemButton onClick={(event) => handleTabChange(event, '0')}>
          <ListItemIcon
            sx={{
              minWidth: 20,
              marginRight: 2,
              width: 'fit-content',
            }}
          >
            <IoIosArrowBack size={20} />
          </ListItemIcon>
          <ListItemText primary="Takaisin" />
        </ListItemButton>
      </ListItem>
      <Divider />
      {options.map((option: any, index: number) => (
        <div key={index}>
          <ListItemButton
            disabled={option.householdId == activeHousehold?.householdId}
            selected={option.householdId == activeHousehold?.householdId}
            onClick={(event) => handleMenuItemClick(option.householdId)}
          >
            <ListItemText
              primary={option.householdName}
              className="MenuItemDefaultColor"
            />
          </ListItemButton>
          {index !== options.length - 1 ? <Divider /> : null}
        </div>
      ))}
    </Box>
  );
};

interface INavTabsTaloudet {
  options: any;
  activeHousehold: any;
  handleMenuItemClick: Function;
  handleTabChange: Function;
}

export default NavTabsTaloudet;
