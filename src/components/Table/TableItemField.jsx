// @flow
import * as React from 'react';

import { mixer } from '../../helpers/styles.js';

const styles = {
  tableItemPlacement: {
    flex: 1,
    height: '100%',
    margin: '0 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableItem: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.618,
    whiteSpace: 'pre-line',
  },
  tableImage: {
    width: 65,
    height: 100,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  textCenter: {
    textAlign: 'center',
  },
};

type Props = {
  data: Object,
  field: {
    props: {
      fieldKey: string,
      flex: number,
      isCenter: boolean,
      isImage: boolean,
      isClickable: boolean,
      needBlackBg: boolean,
      Component?: React.Node,
      MutationContext?: any,
      minWidth?: number,
      color?: string,
    },
  },
};

function itemFieldRenderer(fieldProps, myData = null) {
  if (!fieldProps) return null;

  const {
    isImage,
    isCenter,
    isClickable,
    prefix,
    needBlackBg,
    color,
  } = fieldProps;

  if (isImage) {
    return (
      <div
        style={mixer([
          styles.tableImage,
          {
            backgroundColor: needBlackBg ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
            backgroundImage: myData ? `url(${myData})` : null,
          },
        ])} />
    );
  }

  if (isClickable) return null;

  return (
    <span
      style={mixer([
        styles.tableItem,
        isCenter && styles.textCenter,
        color ? {
          color,
        } : {
          color: '#9b9b9b',
        },
      ])}>
      {Array.isArray(myData)
        ? myData.map(d => (prefix ? `${prefix}${d} ` : `${d} `))
        : myData}
    </span>
  );
}

function wrapComponent({
  field,
  wrapData,
  data,
}) {
  const {
    Component,
  } = field.props;

  return React.cloneElement(
    <Component />,
    {
      tableField: field,
      tableData: wrapData,
      originData: data,
    },
  );
}

function TableItemField({
  data,
  field,
}: Props) {
  const {
    fieldKey,
    flex,
    minWidth,
    Component = null,
  } = field.props;

  const wrapData = data[fieldKey] || null;

  return (
    <div
      style={mixer([
        styles.tableItemPlacement,
        {
          flex: flex || 1,
          minWidth: minWidth || 'auto',
        },
      ])}>
      {Component ? (
        wrapComponent({
          field,
          wrapData,
          data,
        })
      ) : (
        itemFieldRenderer(field.props, wrapData)
      )}
    </div>
  );
}

export default React.memo(TableItemField);
