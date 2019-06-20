// @flow
import React, { memo } from 'react';

import { TableContext } from '../../constants/context.js';
import { mixer } from '../../helpers/styles.js';
import TableHeader from './TableHeader.jsx';
import TableList from './TableList.jsx';
import TablePlaceholder from './TablePlaceholder.jsx';

const styles = {
  tableWrapper: {
    width: '100%',
    height: 'auto',
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
  wrapperStyle?: Object,
};

function Table({
  children,
  getActions,
  dataSource,
  fetchMore,
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
  wrapperStyle,
}: Props) {
  const wrapChildren = children || [];
  const wrapStyle = Array.isArray(wrapperStyle) ? wrapperStyle : [wrapperStyle];

  return (
    <TableContext.Provider
      value={{
        children: Array.isArray(wrapChildren) ? wrapChildren : [wrapChildren],
        getActions: getActions || (() => []),
        dataSource: dataSource || [],
        fetchMore,
        actionTitles: actionTitles || [],
        headerStyles: {
          backgroundColor: headerBackgroundColor,
          textColor: headerTextColor,
          border: headerBorder,
          borderRadius: headerBorderRadius,
          fontSize: headerFontSize,
          wrapperStyle: headerWrapperStyle,
        },
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
};

export default memo(Table);