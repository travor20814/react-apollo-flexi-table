// @flow
import React, { memo } from 'react';
// component
import TableItemField from './TableItemField.jsx';

const styles = {
  tableItemWrapper: {
    width: '100%',
    minHeight: 45,
    padding: '12px 0',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 8,
    border: 0,
  },
  tableFunction: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 8px',
  },
  textCenter: {
    textAlign: 'center',
  },
};

type Props = {
  data: Object,
  children: Array<Object>,
  getActions: Function,
};

type Field = {
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
};

function TableItem({
  data,
  children,
  getActions,
}: Props) {
  return (
    <div style={styles.tableItemWrapper}>
      {children.map((field: Field) => {
        if (!field.props) return null;
        const {
          fieldKey,
        } = field.props;

        return (
          <TableItemField
            key={`${data.id}-${fieldKey}-placement`}
            field={field}
            data={data} />
        );
      })}
      {getActions ? getActions().map((element, idx) => {
        const renderElementWithProps = React.cloneElement(
          element,
          {
            ...data,
          },
        );

        return (
          <div key={`function-wrapper-${idx + 1}`} style={styles.tableFunction}>
            {renderElementWithProps || null}
          </div>
        );
      }) : null}
    </div>
  );
}

export default memo(TableItem);
