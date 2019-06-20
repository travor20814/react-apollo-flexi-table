// @flow
import * as React from 'react';

import { TableContext } from '../../constants/context.js';
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
  tableData: {
    children: React.Node,
    getActions: Function,
    dataSource: Array<{
      id: number,
    }>,
    fetchMore: Function,
  },
};

type State = {
  paddingHeight: number | null,
};

class TableList extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.fetching = false;
    this.reachEnd = false;
    this.scrollListener = () => this.onScroll();
    this.state = {
      paddingHeight: null,
    };
  }

  componentDidMount() {
    this.scroller.addEventListener('scroll', this.scrollListener, false);
  }

  componentDidUpdate(prevProps) {
    const {
      tableData: {
        dataSource,
      },
    } = this.props;

    if (prevProps.tableData.dataSource !== dataSource) {
      this.fetching = false;
      document.getElementById('tableScrollBar').scrollTop = 0;
    }
  }

  componentWillUnmount() {
    this.scroller.removeEventListener('scroll', this.scrollListener, false);
  }

  async onScroll() {
    const {
      scrollHeight,
      scrollTop,
      clientHeight,
    } = this.scroller;

    const {
      paddingHeight,
    } = this.state;

    const remainingHeight = scrollHeight - (scrollTop + clientHeight);

    if (remainingHeight < 150) {
      if (this.fetching) return;

      this.fetchMore();

      if (paddingHeight === null) {
        this.setState({
          paddingHeight: 30,
        });
      } else if (this.reachEnd) {
        this.setState({
          paddingHeight: 0,
        });
      }
    }
  }

  fetching: boolean

  reachEnd: boolean

  scrollListener: Function

  scroller: {
    scrollHeight: number,
    scrollTop: number,
    clientHeight: number,
    addEventListener: any,
    removeEventListener: any,
  }

  async fetchMore() {
    const {
      tableData: {
        dataSource,
        fetchMore,
      },
    } = this.props;

    if (this.fetching || !dataSource.length || !fetchMore) return;

    this.fetching = true;

    const { data } = await fetchMore();

    this.reachEnd = !data[Object.keys(data)[0]].length;
  }

  render() {
    const {
      tableData: {
        children,
        dataSource,
        getActions,
        fetchMore,
      },
    } = this.props;

    const {
      paddingHeight,
    } = this.state;

    return (
      <div
        className="hideScrollBar"
        id="tableScrollBar"
        style={styles.tableListWrapper}
        ref={(ref) => { this.scroller = ref; }}>
        {dataSource.map(data => (
          <TableItem
            key={data.id}
            data={data}
            children={children}
            getActions={getActions} />
        )
        )}
        <div style={{ opacity: this.reachEnd ? 1 : 0 }}>
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
}

export default React.forwardRef(() => (
  <TableContext.Consumer>
    {context => <TableList tableData={context} />}
  </TableContext.Consumer>
));
