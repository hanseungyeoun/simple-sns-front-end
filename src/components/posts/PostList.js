import PostItem from './PostItem';
import Pagination from '../pagination/Pagination'
import Profile from '../../components/profile/Profile'

export default function PostList({ data, currentPage, size, onChange, onToggleLike, addComment }) {
  return (
    <div id="container" className="container list-container">
      <div className="common-inner flx-sb">
        <div className="feed-list">
          <div className="feed-item-area">
            {data?.content.map((post) => {
              return <PostItem key={post.id} post={post} onToggleLike={onToggleLike} addComment={addComment} />
            })}
          </div>
          <div className="pagination-area">
            {
              data?.content &&
              <Pagination currentPage={currentPage} size={size} totalCount={data.totalElements}
                totalPages={data.totalPages} onChange={onChange} ></Pagination>
            }
          </div>
        </div>
        <Profile></Profile>
      </div>
    </div>);
}