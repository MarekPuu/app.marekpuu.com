import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';

interface IMemberTabPanelActions {
  text: string;
  Icon: any;
  // onClick: Function;
  disabled: Function;
}

const MemberTabPanelActions: IMemberTabPanelActions[] = [
  {
    text: 'Muokkaa',
    Icon: MdModeEditOutline,
    // onClick: (cb: Function) => {
    //   cb();
    // },
    disabled: (ownerId: string, myId: string): boolean => ownerId !== myId,
  },
  {
    text: 'Poista',
    Icon: RiDeleteBin6Line,
    // onClick: (cb: Function) => {
    //   cb();
    // },
    disabled: (ownerId: string, myId: string): boolean => ownerId !== myId,
  },
];

export default MemberTabPanelActions;
