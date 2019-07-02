// @flow
import React from 'react';

type Props = {
  id: number,
  name: string,
  nickname: string,
  website: string,
};

function CategoryManageActions(props: Props) {
  // getTableActions will bind dataSource for you
  return (
    <input
      type="checkbox"
      onClick={() => {
        console.log(`Clicked on: ${props.id}/${props.name}`);
      }} />
  );
}

export default CategoryManageActions;
