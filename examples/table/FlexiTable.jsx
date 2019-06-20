/* eslint import/no-extraneous-dependencies: 0 */
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
    padding: '24px 0',
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

  const headerConfigs = {
    headerBackgroundColor: 'rgb(0, 185, 175)',
    headerTextColor: '#fff',
    headerBorder: 0,
    headerBorderRadius: 8,
    headerFontSize: 18,
  };

  const placeholderConfigs = {
    placeholderColor: '#9b9b9b',
    placeholderWrapperStyle: {
      backgroundColor: '#fff',
    },
    placeholderStyle: {
      fontSize: 13,
      fontWeight: 700,
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableWrapper}>
        <Table
          {...headerConfigs}
          {...placeholderConfigs}
          dataSource={list}
          showPlaceholder
          placeholder="No Data Available"
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
