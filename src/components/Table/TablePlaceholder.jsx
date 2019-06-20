// @flow
import React, { memo } from 'react';

import { mixer } from '../../helpers/styles.js';

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
  color: string,
  placeholder: string,
};

function TablePlaceholder({
  color,
  placeholder = '無資料',
}: Props) {
  return (
    <div style={styles.tablePlaceholder}>
      <span
        style={mixer([
          styles.placeholder,
          {
            color,
          },
        ])}>
        {placeholder}
      </span>
    </div>
  );
}

export default memo(TablePlaceholder);
