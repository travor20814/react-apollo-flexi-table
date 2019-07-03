// @flow
import React, { memo } from 'react';

import { TableContext } from '../../constants/context';
import { mixer } from '../../helpers/styles';
import TableHeader from './TableHeader';
import TableList from './TableList';
import TablePlaceholder from './TablePlaceholder';

const styles = {
  tableWrapper: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
};

type Props = {
  children: Array<React.Node>,
  dataSource: Array<Object>,
  actionTitles: Array<String>,
  fetchMore: Function,
  fetchMoreHeight?: number,
  getActions: Function,
  showPlaceholder: boolean,
  placeholder?: string,
  placeholderColor?: string,
  placeholderWrapperStyle?: Object,
  placeholderStyle?: Object,
  headerBackgroundColor?: string,
  headerTextColor?: string,
  headerBorder?: string,
  headerBorderRadius?: number,
  headerFontSize?: number,
  headerWrapperStyle?: Object,
  itemWrapperStyle?: Object,
  wrapperStyle?: Object,
};

function Table({
  children,
  getActions,
  dataSource,
  fetchMore,
  fetchMoreHeight,
  actionTitles,
  showPlaceholder,
  placeholder,
  placeholderColor,
  placeholderWrapperStyle,
  placeholderStyle,
  headerBackgroundColor,
  headerTextColor,
  headerBorder,
  headerBorderRadius,
  headerFontSize,
  headerWrapperStyle,
  itemWrapperStyle,
  wrapperStyle,
}: Props) {
  const wrapChildren = children || [];
  const wrapStyle = Array.isArray(wrapperStyle) ? wrapperStyle : [wrapperStyle];
  const tableData = {
    children: Array.isArray(wrapChildren) ? wrapChildren : [wrapChildren],
    getActions: getActions || (() => []),
    dataSource: dataSource || [],
    fetchMore,
    fetchMoreHeight,
    actionTitles: actionTitles || [],
    headerStyles: {
      backgroundColor: headerBackgroundColor,
      textColor: headerTextColor,
      border: headerBorder,
      borderRadius: headerBorderRadius,
      fontSize: headerFontSize,
      wrapperStyle: headerWrapperStyle,
    },
    itemStyles: {
      wrapperStyle: itemWrapperStyle,
    },
    colors: {
      PRIMARY_COLOR: '#ff0000',
      TEXT_COLOR: '#9b9b9b',
    },
  };

  return (
    <TableContext.Provider value={tableData}>
      <div
        style={mixer([
          styles.tableWrapper,
          ...wrapStyle,
        ])}>
        <TableHeader />
        {!showPlaceholder ? (
          <TableList tableData={tableData} />
        ) : (
          <TablePlaceholder
            color={placeholderColor}
            wrapperStyle={placeholderWrapperStyle}
            style={placeholderStyle}
            placeholder={placeholder} />
        )}
      </div>
    </TableContext.Provider>
  );
}

Table.defaultProps = {
  wrapperStyle: null,
  fetchMoreHeight: 150,
  headerBackgroundColor: 'transparent',
  headerTextColor: '#000',
  headerBorder: '0px solid #000',
  headerBorderRadius: 0,
  headerFontSize: 18,
  headerWrapperStyle: null,
  placeholderColor: '#9b9b9b',
  placeholderWrapperStyle: null,
  placeholderStyle: null,
  placeholder: null,
  itemWrapperStyle: null,
};

export default memo(Table);
