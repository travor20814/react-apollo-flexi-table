// @flow
import React, {
  memo,
  useState,
  useEffect,
  useRef,
} from 'react';

import TableItem from './TableItem';

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
  const isChangeFromFetchMore = useRef();
  const [paddingHeight, setPaddingHeight]: [number, Function] = useState(null);

  useEffect(() => {
    isChangeFromFetchMore.current = false;
    isFetching.current = false;
    isReachEnd.current = false;
  }, []);

  useEffect(() => {
    isFetching.current = false;
    if (isChangeFromFetchMore.current) {
      isChangeFromFetchMore.current = false;
    } else {
      isReachEnd.current = false;
      document.getElementById('tableScrollBar').scrollTop = 0;
    }
  }, [dataSource]);

  useEffect(() => {
    const ref = tableListRef.current;

    async function fetchMoreScope() {
      if (isFetching.current
        || isReachEnd.current
        || !dataSource.length
        || !fetchMore
      ) return;

      isFetching.current = true;
      isChangeFromFetchMore.current = true;

      const fmResponse = await fetchMore();

      if (fmResponse) {
        const {
          data,
        } = fmResponse;

        if (data) {
          /* fetchMore is fetch from apollo */
          const newDataSource = data[Object.keys(data)[0]];

          if (Array.isArray(newDataSource)) {
            isReachEnd.current = newDataSource.length === dataSource.length;
          } else {
            const dataSourceKeys = Object.keys(newDataSource);
            const candidateSourceKey = dataSourceKeys.find(
              key => Array.isArray(newDataSource[key])
            );

            if (candidateSourceKey) {
              isReachEnd.current = newDataSource[candidateSourceKey].length === dataSource.length;
            }
          }
        } else {
          /* reach end when return empty array */
          isReachEnd.current = !fmResponse.length;
        }
      }

      if (isReachEnd.current) isFetching.current = false;
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
      className="hide-scrollbar"
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
      ))}
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
