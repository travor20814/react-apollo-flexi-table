/* eslint import/no-extraneous-dependencies: 0, arrow-body-style: 0 */
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
import {
  originList,
  moreList,
} from '../mock.js';
// your components
import ClickableBlock from './custom/ClickableBlock.jsx';
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
    width: 1024,
    height: 480,
    padding: '24px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
};

function FlexiTable() {
  const [list, setList] = useState(originList);

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
        {/*
          Bind Query outside Table, and pass it into dataSource.
          For fetchMore demo reason, we are currently using mock list.
        */}
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
              fetchMoreHeight={30}
              fetchMore={() => {
                /* trigger fetchMore base on the fetchMoreHeight */
                if (list.length !== (originList.length + moreList.length)) {
                  setList([
                    ...list,
                    ...moreList,
                  ]);

                  return moreList;
                }

                return [];
              }}
              showPlaceholder={!list.length}
              placeholder="No Data Available"
              actionTitles={['Actions']}
              getActions={() => [
                <CategoryManageActions />,
              ]}>
              <TableField
                name="User Name"
                fieldKey="name"
                flex={1}
                isCenter />
              <TableField
                name="Nickname"
                fieldKey="nickname"
                flex={1}
                Component={(props) => {
                  /* You can bind any components you want here */
                  return (
                    <ClickableBlock
                      {...props}
                      mutate={() => { console.log('Maybe a react-apollo mutation'); }} />
                  );
                }} />
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
