import React from 'react';
import DataTable from '../DataTable/DataTable';
import './Talouspage.css';

function createData(paiva: string, otsikko: string, summa: number) {
  return { paiva, otsikko, summa };
}

const Menotrows = [
  createData('11.03.2023', 'ruokalasku', 50.1),
  createData(
    '11.03.2023',
    'wolt lasku perjantailta ja viinit torstailta',
    50.1
  ),
  createData('11.03.2023', 'ruokalasku', 40.1),
];

const DataTableContainer = () => {
  return (
    <>
      <div className='talouspage_datatable_container'>
        <div className='talouspage_datatable'>
          <DataTable
            tableHead={['Päivämäärä', 'Otsikko', 'Summa']}
            tableBodySetting={[
              { key: 'paiva' },
              { key: 'otsikko' },
              { key: 'summa', align: 'right', symbol: '€' },
            ]}
            title='Talouden menot'
            tableRows={Menotrows}
          />
        </div>
        <div className='talouspage_datatable'>
          <DataTable
            tableHead={['Status', 'Otsikko']}
            tableBodySetting={[{ key: 'status' }, { key: 'otsikko' }]}
            tableRows={Menotrows}
            title='Tehtävälista'
          />
        </div>
      </div>
    </>
  );
};

export default DataTableContainer;
