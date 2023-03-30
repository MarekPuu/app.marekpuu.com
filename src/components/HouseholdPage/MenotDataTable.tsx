import React from 'react';
import DataTable from '../DataTable/DataTable';

const MenotDataTable = () => {
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
