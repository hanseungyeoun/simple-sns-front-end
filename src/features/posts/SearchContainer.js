import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { postsAction } from "../../modules/post/postsSlice";
import Search from "../../components/search/Search";

export default function SearchContainer() {
  const { data, error, loading } = useSelector(state => state.posts.searchPosts);
  const dispatch = useDispatch();
  let { hashtag } = useParams() ?? '';

  useEffect(() => {
    hashtag && dispatch(postsAction.searchPosts(hashtag))
  }, [dispatch, hashtag]);

  const onSubmit = ({ hashtag }) => {
    console.log("search=" + hashtag);
    dispatch(postsAction.searchPosts(hashtag))
  }

  const onChange = (e) => {
    hashtag = e.target.value;
  }

  if (loading) return <div>로딩중...</div>;

  if (error) {
    alert(error?.response.data.message);
    return null;
  }

  return (
    <>
      <Search data={data} hashtag={hashtag} onSubmit={onSubmit} onChange={onChange}  ></Search>
    </>
  )
}