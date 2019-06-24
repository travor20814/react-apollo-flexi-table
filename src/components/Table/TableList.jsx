// @flow
import React, {
  memo,
  useState,
  useEffect,
  useRef,
} from 'react';

import TableItem from './TableItem.jsx';

const styles = {
  tableListWrapper: {
    flex: 1,
    width: '100%',
    height: 'calc(100% - 44px)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paddingWrapper: {
    transition: '1s',
    transitionTImingFunction: 'ease-in-out',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    minHeight: 5,
  },
};

type Props = {
  tableData: TableContext,
};

function TableList({
  tableData: {
    children,
    dataSource,
    getActions,
    fetchMore,
    fetchMoreHeight,
    itemStyles,
  },
}: Props) {
  const tableListRef = useRef(null);
  const isFetching = useRef();
  const isReachEnd = useRef();
  const [paddingHeight, setPaddingHeight]: [number, Function] = useState(null);

  useEffect(() => {
    isFetching.current = false;
    document.getElementById('tableScrollBar').scrollTop = 0;
  }, [dataSource]);

  useEffect(() => {
    const ref = tableListRef.current;
    isFetching.current = false;
    isReachEnd.current = false;

    async function fetchMoreScope() {
      if (isFetching.current || !dataSource.length || !fetchMore) return;

      isFetching.current = true;

      const fmResponse = await fetchMore();

      if (fmResponse) {
        if (fmResponse.data) {
          /* fetchMore is fetch from apollo */
          isReachEnd.current = !fmResponse.data[Object.keys(fmResponse.data)[0]].length;
        } else {
          /* reach end when return empty array */
          isReachEnd.current = !fmResponse.length;
        }
      }
    }

    function onScroll() {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = ref;

      const remainingHeight = scrollHeight - (scrollTop + clientHeight);

      if (remainingHeight < fetchMoreHeight) {
        if (isFetching.current) return;

        fetchMoreScope();

        if (paddingHeight === null) {
          setPaddingHeight(30);
        } else if (isReachEnd.current) {
          setPaddingHeight(0);
        }
      }
    }

    if (ref) {
      ref.addEventListener('scroll', onScroll, false);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('scroll', onScroll, false);
      }
    };
  }, [dataSource.length, fetchMore, paddingHeight, fetchMoreHeight]);

  return (
    <div
      className="hideScrollBar"
      id="tableScrollBar"
      style={styles.tableListWrapper}
      ref={tableListRef}>
      {dataSource.map(data => (
        <TableItem
          key={data.id}
          data={data}
          children={children}
          getActions={getActions}
          itemStyles={itemStyles} />
      )
      )}
      <div style={{ opacity: isReachEnd.current ? 1 : 0 }}>
        <div
          style={{
            ...styles.paddingWrapper,
            height: paddingHeight,
            display: fetchMore ? 'flex' : 'none',
          }} />
      </div>
    </div>
  );
}

export default memo(TableList);
