import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import MembersTabPanelActions from './MembersTabPanelActions';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getHouseholdUsers } from '../../api/services/householdUsers';
import { useAxios } from '../../api/axios';
import DataTableSkeleton from '../DataTable/DataTableComponents/DataTableSkeleton';
import { useAuth0 } from '@auth0/auth0-react';
import { CanEditAdmin } from '../../utils/RoleHelper';
import AddUserToHousehold from '../Modals/AddUserToHousehold';
import '../../Pages/styles/HouseholdSettings.css';

// css tulee pages/styles

const MembersTabPanel = () => {
  const [open, setOpen] = React.useState(false);
  const axios = useAxios();
  const { user } = useAuth0();
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['household/', id, '/users'],
    queryFn: async () => await getHouseholdUsers(axios, id as string),
  });

  const isAdmin = CanEditAdmin(data?.data, user?.sub);

  return (
    <>
      <div className="memberTabAddUserContainer">
        <div>
          <p>
            Voit lisätä talouteen käyttäjiä, antaa käyttäjille rooleja tai
            poista käyttäjiä taloudesta
          </p>
        </div>
        <div className="width100-500">
          <Button
            className="width100-500"
            onClick={() => setOpen(true)}
            disabled={!isAdmin}
            sx={{ minWidth: '200px' }}
            variant="outlined"
          >
            Lisää käyttäjä
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100% ' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '100%' }}>Nimi</TableCell>
              <TableCell sx={{ minWidth: '100px' }}>Rooli</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <DataTableSkeleton tableHead={['Nimi', 'Rooli']} />
          ) : (
            <TableBody>
              {data?.data?.map((row: IRows) => (
                <TableRow
                  key={row.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell>{row.roleName}</TableCell>
                  <MembersTabPanelActions user={row} isAdmin={isAdmin} />
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <AddUserToHousehold open={open} setOpen={setOpen} />
    </>
  );
};

interface IRows {
  email: string;
  roleName: string;
  userId: string;
}
interface IUsers {
  email: string;
  roleName: string;
  userId: string;
  roleId: number;
}

export default MembersTabPanel;
