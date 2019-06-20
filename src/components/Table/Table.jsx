// @flow
import React, { Component } from 'react';

import { TableContext } from '../../constants/context.js';
import { mixer } from '../../helpers/styles.js';
import TableHeader from './TableHeader.jsx';
import TableList from './TableList.jsx';
import TablePlaceholder from './TablePlaceholder.jsx';

const styles = {
  tableWrapper: {
    flex: 1,
    width: '100%',
    height: 'auto',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
};

type Props = {
  children: Array<Object>,
  dataSource: Array<Object>,
  actionTitles: Array<String>,
  fetchMore: Function,
  getActions: Function,
  showPlaceholder: Boolean,
  placeholder: String,
  options: Object,
  style?: Object,
};

class Table extends Component<Props> {
  static defaultProps = {
    style: null,
  };

  render() {
    const {
      children,
      getActions,
      dataSource,
      fetchMore,
      actionTitles,
      showPlaceholder,
      placeholder,
      options,
      style,
    } = this.props;

    const wrapChildren = children || [];
    const wrapStyle = Array.isArray(style) ? style : [style];

    return (
      <TableContext.Provider
        value={{
          children: Array.isArray(wrapChildren) ? wrapChildren : [wrapChildren],
          getActions: getActions || (() => []),
          dataSource: dataSource || [],
          fetchMore,
          options,
          actionTitles: actionTitles || [],
          colors: {
            PRIMARY_COLOR: '#ff0000',
            TEXT_COLOR: '#9b9b9b',
          },
        }}>
        <div
          style={mixer([
            styles.tableWrapper,
            ...wrapStyle,
          ])}>
          <TableHeader />
          {!showPlaceholder ? (
            <TableList />
          ) : (
            <TablePlaceholder
              color="#9b9b9b"
              placeholder={placeholder} />
          )}
        </div>
      </TableContext.Provider>
    );
  }
}


export default Table;
