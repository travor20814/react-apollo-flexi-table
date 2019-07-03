// @flow
import React, { memo } from 'react';

import { mixer } from '../../helpers/styles';

const styles = {
  tablePlaceholder: {
    width: '100%',
    height: 66,
    padding: '12px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    border: 0,
  },
  placeholder: {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1,
  },
};

type Props = {
  wrapperStyle: Object,
  style: Object,
  color: string,
  placeholder: string,
};

function TablePlaceholder({
  wrapperStyle,
  style,
  color,
  placeholder = '無資料',
}: Props) {
  return (
    <div
      style={mixer([
        styles.tablePlaceholder,
        wrapperStyle ? {
          ...wrapperStyle,
        } : null,
      ])}>
      <span
        style={mixer([
          styles.placeholder,
          {
            color,
          },
          style ? {
            ...style,
          } : null,
        ])}>
        {placeholder}
      </span>
    </div>
  );
}

export default memo(TablePlaceholder);
