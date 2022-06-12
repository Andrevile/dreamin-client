import usersApi from 'apis/users.api';
import ItemList from 'components/Profile/ItemList';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

interface Props {
  userId: string | string[];
  isLeader: boolean;
  editMode?: boolean;
}
const PostList: React.FC<Props> = ({ userId, isLeader, editMode }) => {
  const { isLoading, isError, error, data } = useQuery(['user-posts', userId], () => usersApi.getPostList(userId));

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return <ItemList editMode={editMode} isLeader={isLeader} dataList={data} />;
};

export default PostList;
