// @flow
import React from 'react';

import { TableContext } from '../../constants/context.js';
import { mixer } from '../../helpers/styles.js';

const styles = {
  tableFrozenHeaderWrapper: {
    width: '100%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: '0 4px 0 0',
    margin: '10px 0 16px',
  },
  headerField: {
    flex: 1,
    margin: '0 8px',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 400,
    color: 'white',
  },
};

function TableHeader() {
  return (
    <TableContext.Consumer>
      {({
        children,
        getActions,
        actionTitles,
        colors,
      }) => (
        <div
          style={mixer([
            styles.tableFrozenHeaderWrapper,
            {
              backgroundColor: colors.PRIMARY_COLOR,
            },
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
                  },
                ])}>
                {name || null}
              </span>
            );
          })) || null}
          {getActions ? getActions().map((element, idx) => (
            <span key={`${element}-${idx + 1}`} style={styles.headerField}>
              {actionTitles[idx] || null}
            </span>
          )) : null}
        </div>
      )}
    </TableContext.Consumer>
  );
}

export default TableHeader;
