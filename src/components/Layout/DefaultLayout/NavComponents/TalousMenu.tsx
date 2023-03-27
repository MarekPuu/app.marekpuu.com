import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Menu from '@mui/material/Menu';

import NavTabsAsetukset from './NavTabsAsetukset';
import NavTabsTaloudet from './NavTabsTaloudet';

const ChoseTalousMenu = ({
  anchorEl,
  open,
  handleClose,
  tab,
  handleTabChange,
  options,
  handleMenuItemClick,
  handleModalOpen,
  activeHousehold,
  showBackOption,
}: IChoseTalousMenu) => {
  return (
    <Menu
      sx={{ marginTop: '10px' }}
      id="lock-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => handleClose()}
      className="MenuItemDefaultColor"
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
      }}
    >
      <TabContext value={tab}>
        <TabPanel sx={{ padding: 0 }} value="0">
          <NavTabsAsetukset
            options={options}
            handleClose={handleClose}
            activeHousehold={activeHousehold}
            handleTabChange={handleTabChange}
            handleModalOpen={handleModalOpen}
          />
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="1">
          <NavTabsTaloudet
            showBackOption={showBackOption}
            activeHousehold={activeHousehold}
            options={options}
            handleMenuItemClick={handleMenuItemClick}
            handleTabChange={handleTabChange}
          />
        </TabPanel>
      </TabContext>
    </Menu>
  );
};

interface IChoseTalousMenu {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: Function;
  tab: string;
  handleTabChange: Function;
  options: object[];
  handleMenuItemClick: Function;
  handleModalOpen: Function;
  activeHousehold: object;
  showBackOption: boolean;
}

export default ChoseTalousMenu;
