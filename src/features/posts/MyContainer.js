import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyPostList from '../../components/mypost/MyPostList'
import { useSearchParams } from 'react-router-dom'
import { postsAction } from "../../modules/post/postsSlice";

export default function My() {
  const { data, error, loading } = useSelector(state => state.posts.myPosts);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;
  const size = searchParams.get('size') ?? 3;
  const dispatch = useDispatch();

  const dispatchPost = useCallback(
    (page, size) => {
      dispatch(postsAction.getMyPosts({ page: page - 1, size }))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatchPost(currentPage, size);
  }, [dispatchPost, currentPage, size]);

  const onChange = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    dispatchPost(page, size)
  }

  if (loading) return <div>로딩중...</div>;

  if (error) {
    alert(error?.response?.data?.message);
    return null;
  }

  return (
    <MyPostList data={data} currentPage={currentPage} size={size} onChange={onChange}></MyPostList>
  )
}