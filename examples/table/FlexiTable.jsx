import React, {
  useState,
} from 'react';
import { hot } from 'react-hot-loader';
import {
  Table,
  TableField,
} from '../../src/index.js';

// your components
import CategoryManageActions from './actions/CategoryManageActions.jsx';

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tableWrapper: {
    width: 800,
    height: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
};

function FlexiTable() {
  const [list, setList] = useState([{
    id: 1,
    name: 'John',
    website: 'https://www.google.com',
  }, {
    id: 2,
    name: 'Stanney',
    website: 'https://www.google.com',
  }]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableWrapper}>
        <Table
          dataSource={list}
          actionTitles={['操作']}
          getActions={() => [
            <CategoryManageActions />,
          ]}>
          <TableField
            name="Name"
            fieldKey="name"
            flex={1}
            isCenter />
          <TableField
            name="Website"
            fieldKey="website"
            flex={2}
            isCenter />
        </Table>
      </div>
    </div>
  );
}

export default hot(module)(FlexiTable);
