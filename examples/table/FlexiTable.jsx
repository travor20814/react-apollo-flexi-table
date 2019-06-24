/* eslint import/no-extraneous-dependencies: 0 */
import React, {
  useState,
  memo,
} from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableWrapper: {
    width: 800,
    height: 240,
    padding: '24px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
};

const moreList = [{
  id: 7,
  name: 'Benson',
  website: 'https://www.google.com',
}, {
  id: 8,
  name: 'Emily',
  website: 'https://www.google.com',
}, {
  id: 9,
  name: 'Apple',
  website: 'https://www.google.com',
}];

function FlexiTable() {
  const [list, setList] = useState([{
    id: 1,
    name: 'John',
    website: 'https://www.google.com',
  }, {
    id: 2,
    name: 'Stanney',
    website: 'https://www.google.com',
  }, {
    id: 3,
    name: 'Travor',
    website: 'https://www.google.com',
  }, {
    id: 4,
    name: 'Elephant',
    website: 'https://www.google.com',
  }, {
    id: 5,
    name: 'Banana',
    website: 'https://www.google.com',
  }, {
    id: 6,
    name: 'Orange',
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

  const itemConfigs = {
    itemWrapperStyle: {
      minHeight: 'auto',
      borderRadius: 4,
      backgroundColor: '#fff',
      padding: '8px 0',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableWrapper}>
        <Query
          query={gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `}>
          {({
            data,
          }) => (
            <Table
              {...headerConfigs}
              {...placeholderConfigs}
              {...itemConfigs}
              dataSource={list}
              fetchMore={() => {
                if (list.length !== 9) {
                  setList([
                    ...list,
                    ...moreList,
                  ]);

                  return moreList;
                }

                return [];
              }}
              fetchMoreHeight={30}
              showPlaceholder={!list.length}
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
          )}
        </Query>
      </div>
    </div>
  );
}

export default memo(FlexiTable);
