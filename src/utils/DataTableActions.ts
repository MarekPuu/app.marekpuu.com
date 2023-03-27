import { RiFileTextLine, RiDeleteBin6Line } from 'react-icons/ri';
import { IoIosCloudDone } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';

interface IDataTableActions {
  text: string;
  Icon: any;
  onClick: Function;
}

const DataTableActions: IDataTableActions[] = [
  {
    text: 'Tiedot',
    Icon: RiFileTextLine,
    onClick: () => {
      console.log('Tiedot');
    },
  },
  {
    text: 'Hoidettu',
    Icon: IoIosCloudDone,
    onClick: (id: number) => {
      console.log('Hoidettu', id);
    },
  },
  {
    text: 'Muokkaa',
    Icon: MdModeEditOutline,
    onClick: () => {
      console.log('Muokkaa');
    },
  },
  {
    text: 'Poista',
    Icon: RiDeleteBin6Line,
    onClick: (id: number) => {
      console.log('Tiedot', id);
    },
  },
];

export default DataTableActions;
