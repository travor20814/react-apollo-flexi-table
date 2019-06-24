// @flow

export type TableContext = {
  children: Array<React.Node>,
  getActions?: Function,
  dataSource: Array<Object>,
  fetchMore?: Function,
  actionTitles?: Array<string>,
  headerStyles: {
    backgroundColor: string,
    textColor: string,
    border: string,
    borderRadius: number,
    fontSize: number,
    wrapperStyle: Object,
  },
  itemStyles: {
    wrapperStyle: Object,
  },
  colors: {
    PRIMARY_COLOR: string,
    TEXT_COLOR: string,
  },
};
