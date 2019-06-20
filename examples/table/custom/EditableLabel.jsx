// @flow
/* eslint jsx-a11y/no-autofocus: 0 */
import React, {
  memo,
  useState,
} from 'react';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    width: 100,
    fontWeight: 500,
    color: '#9b9b9b',
    padding: '0 10px 5px 5px',
    fontSize: 15,
    lineHeight: 1.618,
    whiteSpace: 'pre-line',
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: '8px 8px 10px 10px',
    border: '1px solid #9b9b9b',
    borderRadius: 8,
    backgroundColor: 'transparent',
    outline: 0,
  },
};

type Props = {
  tableField: {
    autoFocus: Boolean,
  },
  tableData: String,
  originData: {
    id: Number,
    name: String,
  },
  customVariables: Object,
  mutate: Function,
  loading: Boolean,
  type?: String,
  min?: Number,
  placeholder?: String,
};

function EditableLabel({
  tableData,
  originData,
  mutate,
  customVariables,
  loading = false,
  type,
  min,
  placeholder,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(originData.name || '');

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      style={styles.wrapper}>
      {!isEditing ? (
        <span
          style={styles.label}>
          {tableData || null}
        </span>
      ) : (
        <input
          key="table-input"
          type={type}
          min={min}
          style={styles.input}
          placeholder={placeholder}
          autoFocus
          value={editingValue}
          disabled={loading}
          onBlur={() => setIsEditing(false)}
          onChange={e => setEditingValue(e.target.value)}
          onKeyPress={async (e) => {
            if (e.key === 'Enter' && editingValue !== '') {
              e.preventDefault();

              if (mutate) {
                await mutate({
                  variables: {
                    name: editingValue,
                    ...customVariables,
                  },
                });
              }
              setIsEditing(false);
            }
          }
          } />
      )}
    </div>
  );
}

EditableLabel.defaultProps = {
  type: 'text',
  placeholder: '',
  min: null,
};

export default memo(EditableLabel);
