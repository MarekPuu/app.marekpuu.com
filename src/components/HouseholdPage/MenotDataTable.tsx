import React from 'react';
import { useQuery } from 'react-query';
import { useAxios } from '../../api/axios';
import DataTable from '../DataTable/DataTable';

const MenotDataTable = () => {
  const axios = useAxios();

  return (
    <DataTable
      tableHead={['Päivämäärä', 'Otsikko', 'meno']}
      tableBodySetting={[
        { key: 'date' },
        { key: 'summary' },
        { key: 'temperatureC', align: 'right', symbol: '€' },
      ]}
      title="Talouden menot"
      tableRows={[]}
      loading={true}
    />
  );
};

export default MenotDataTable;
