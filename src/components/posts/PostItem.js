import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Comment from './Comment'
import { useState } from 'react';
import localStore from '../../util/localStore'

export default function PostItem({ post, onToggleLike, addComment }) {
  const [isLong, setIsLong] = useState(false);
  const [comment, setComment] = useState('');


  const moreText = () => {
    setIsLong(!isLong);
  }

  const onChange = (e) => {
    setComment(e.target.value)
  }

  const onClick = (id) => {
    const { nickName } = localStore.getUser();
    addComment({
      id,
      nickName,
      comment: comment
    })
  }

  return (
    <div id="container" className="container list-container">
      <div className="feed-item">
        <div className="feed-header">
          <a href="../../docs/page/view-thumb.html" className="flx-ac">
            <img src={post.profileImage ?? "../../assets/images/img-user.png"} alt="" className="user-img" />
            {post.nickName}
          </a>
        </div>
        <div className="feed-body">
          <img className="feed-img" src={post.postImage} alt="" />
          <div className="feed-like">
            <button className={classNames("btn-like", post.isLike && "is-active")}
              onClick={() => onToggleLike(post.id)}>응원해요</button>
            <span className="like-count">{post.likeCount ? post.likeCount + '명이 응원해요' : '첫번째로 응원하기'}</span>
          </div>
          <p className="feed-txt">
            {post.content.length > 20 && !isLong ? post.content.slice(0, 20) : post.content}
            {post.content.length > 20 && !isLong && <span className="feed-more" onClick={moreText}>더보기</span >}
            &nbsp;
            {post.hashtags?.map((hashtag, index) =>
              <Link key={index} className='tag' to={'/search/' + hashtag}> hashtag </Link>)}
          </p>
          <p className="feed-date">{post.createdAt}</p>
        </div>
        <div className="feed-footer">
          <div className="comment-area">
            <ul className="comment-list">
              {post.comments?.map(comment =>
                <Comment key={comment.id} comment={comment} ></Comment>)}
            </ul>
          </div>
          <div className="comment-form">
            <input className="comment-input" name='comment' type="text" value={comment} onChange={onChange} placeholder="댓글을 입력하세요." />
            <button className="btn-comment color-primary" onClick={() => onClick(post?.id)}>게시</button>
          </div>
        </div>
      </div >
    </div >

  )
}