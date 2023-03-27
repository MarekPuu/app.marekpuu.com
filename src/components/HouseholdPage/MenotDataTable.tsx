import React from 'react';
import { useQuery } from 'react-query';
import { useAxios } from '../../api/axios';
import { getMenot } from '../../api/services/menot';
import DataTable from '../DataTable/DataTable';

const MenotDataTable = () => {
  const axios = useAxios();
  const { isLoading, error, data } = useQuery('menotData', () =>
    getMenot(axios, 1)
  );

  return (
    <DataTable
      tableHead={['Päivämäärä', 'Otsikko', 'meno']}
      tableBodySetting={[
        { key: 'date' },
        { key: 'summary' },
        { key: 'temperatureC', align: 'right', symbol: '€' },
      ]}
      title="Talouden menot"
      tableRows={data?.data}
      loading={isLoading}
    />
  );
};

export default MenotDataTable;
