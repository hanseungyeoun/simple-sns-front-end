import { useDispatch, useSelector } from 'react-redux'
import { usersAction } from '../../modules/users/usersSlice'
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import classNames from 'classnames';


export default function Profile() {
  const { data: profile, error, loading } = useSelector(state => state.users.userDatails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersAction.getUserDetails());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) {
    alert(error);
    return null;
  }

  return (
    <div className="my-profile-area">
      <div className="top-section">
        <div className="user-img-area">
          {
            profile &&
            <Link to={`/user/${profile.id}`}>
              <img className="user-img" src={profile?.profileImage ?? ''} alt="" />
            </Link>
          }
        </div>

        <div className="user-info-area">
          <p className="user-nickname">{profile?.nickName ?? ''}</p>
          <p className="user-desc">{profile?.description}</p>
          <div className="user-count">
            <p>게시물 <b>{profile?.feedCount ?? '0'}</b></p>
            <p>열정지수 <b className="color-primary">{profile?.passionIndex ?? '0'}</b></p>
            <p>관심사 <b>{profile?.hashtagCount ?? '0'}</b></p>
          </div>
        </div>
        <div className="user-interest-area">
          {
            profile?.hashtags?.map((hashtag, index) => {
              <p>열정지수 <b className="color-primary">{profile.passionIndex}</b></p>
              return <Link key={index} to={'tag'} className={classNames("tag", { primary: profile.topHashtags.includes(hashtag) })}>ddd</Link>
            })
          }
        </div>
      </div>
    </div >
  )
}