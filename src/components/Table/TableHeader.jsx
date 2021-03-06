// @flow
import React, {
  memo,
  useContext,
} from 'react';

import { TableContext } from '../../constants/context';
import { mixer } from '../../helpers/styles';

const styles = {
  tableFrozenHeaderWrapper: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0 0 16px 0',
  },
  headerField: {
    flex: 1,
    margin: '0 8px',
    textAlign: 'center',
    fontWeight: 400,
  },
};

function TableHeader() {
  const {
    children,
    getActions,
    actionTitles,
    headerStyles,
  }: TableContext = useContext(TableContext);

  return (
    <div
      style={mixer([
        styles.tableFrozenHeaderWrapper,
        {
          backgroundColor: headerStyles.backgroundColor,
          border: headerStyles.headerBorder,
          borderRadius: headerStyles.borderRadius,
        },
        headerStyles.wrapperStyle ? {
          ...headerStyles.wrapperStyle,
        } : null,
      ])}>
      {(children && children.map((field, idx) => {
        if (!field.props) return null;

        const {
          name,
          flex,
          minWidth,
        } = field.props;

        return (
          <span
            key={`${name}-${idx + 1}`}
            style={mixer([
              styles.headerField,
              {
                flex: flex || 1,
                minWidth: minWidth || 'auto',
                color: headerStyles.textColor,
                fontSize: headerStyles.fontSize,
              },
            ])}>
            {name || null}
          </span>
        );
      })) || null}
      {getActions ? getActions().map((element, idx) => (
        <span
          key={`${element}-${idx + 1}`}
          style={mixer([
            styles.headerField,
            {
              color: headerStyles.textColor,
              fontSize: headerStyles.fontSize,
            },
          ])}>
          {actionTitles[idx] || null}
        </span>
      )) : null}
    </div>
  );
}

export default memo(TableHeader);
