// @flow
/* eslint jsx-a11y/no-autofocus: 0 */
import React, {
  memo,
} from 'react';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.618,
    color: '#9b9b9b',
    padding: '0 10px 5px 5px',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    wordBreak: 'break-all',
  },
};

type Props = {
  tableData: string,
  originData: {
    id: number,
    name: string,
  },
  mutate: Function,
};

function ClickableBlock({
  tableData,
  originData,
  mutate,
}: Props) {
  return (
    <div
      onDoubleClick={() => {
        alert(`
          You are clicking a custom component with:
          TableData: ${tableData}
          originData: ${originData}
          mutate Function: ${mutate}
        `);
      }}
      style={styles.wrapper}>
      <span
        style={styles.label}>
        {tableData ? `${tableData} (double-click me)` : null}
      </span>
    </div>
  );
}

export default memo(ClickableBlock);
