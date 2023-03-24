import React from 'react';
import { useQuery } from 'react-query';
import useAxios from '../../api/axios';
import { getMenot } from '../../api/services/menot';
import DataTable from '../DataTable/DataTable';

const ToDoDataTable = () => {
  const axios = useAxios();
  const { isLoading, error, data } = useQuery('todoData', () =>
    getMenot(axios, 1)
  );

  // console.log(isLoading, error, data?.data);

  return (
    <DataTable
      tableHead={['Päivämäärä', 'Otsikko']}
      tableBodySetting={[{ key: 'date' }, { key: 'summary' }]}
      title="Talouden menot"
      tableRows={data?.data}
      loading={isLoading}
    />
  );
};

export default ToDoDataTable;
