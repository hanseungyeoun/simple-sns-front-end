import { useEffect, useCallback } from "react";
import PostList from "../../components/posts/PostList";
import { useSelector, useDispatch } from "react-redux";
import { postsAction } from "../../modules/post/postsSlice";
import { useSearchParams } from 'react-router-dom'
export default function Posts() {
  const { data, error, loading } = useSelector(state => state.posts.posts);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;
  const size = searchParams.get('size') ?? 3;
  const dispatch = useDispatch();

  const dispatchPost = useCallback(
    (page, size) => {
      dispatch(postsAction.getPosts({ page: page - 1, size }))
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

  const onToggleLike = (id) => {
    dispatch(postsAction.togleLike(id))
  }

  const addComment = (comment) => {
    dispatch(postsAction.addComment(comment))
  }

  if (loading) return <div>로딩중...</div>;

  if (error) {
    alert(error?.response?.data?.message);
    return null;
  }

  return (
    <>
      <PostList data={data} currentPage={currentPage} size={size} onChange={onChange} onToggleLike={onToggleLike} addComment={addComment} />
    </>
  )
}
