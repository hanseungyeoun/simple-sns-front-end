import { useSelector, useDispatch } from 'react-redux';
import { usersAction } from '../modules/users/usersSlice'
import { Link } from 'react-router-dom'

function Navi() {
  const isLogin = useSelector(state => state.users.isLogin);
  const { data: user } = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  const fetchLogout = () => {
    console.log('fetchLogout');
    dispatch(usersAction.logout());
  }

  return (
    <>
      <nav id="nav">
        <div className="common-inner nav-inner">
          <Link to='/'>
            <img src="../../assets/images/logo.svg" alt="FAST CAMPUS" />
          </Link>

          <ul className="gnb-list" data-login={isLogin}>
            <li className="gnb-item menu-search">
              <Link to="/search" className="gnb-link">
                <img src="../../assets/images/ico-search.svg" alt="검색하기" />
              </Link>
            </li>
            <li className="gnb-item menu-write">
              <Link to="/write" className="gnb-link">
                <img src="../../assets/images/ico-write.svg" alt="전체 피드" />
              </Link>
            </li>
            <li className="gnb-item menu-user">
              <Link to="/my" className="gnb-link">
                <img src={(isLogin && user?.profileImage) ? user?.profileImage : "../../assets/images/avatar.png"} alt="잔망루피님의 사진" className="user-img" />
              </Link>
            </li>

            <li className="gnb-item menu-user">
              <button className="gnb-link btn-small btn-solid-primary" onClick={fetchLogout}>
                로그 아웃
              </button>
            </li>

            <li className="gnb-item menu-login">
              <Link to="/login" className="gnb-link btn-small btn-solid-primary">로그인</Link>
            </li>
            <li className="gnb-item menu-signup">
              <Link to="/signup" className="gnb-link">회원가입</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
export default Navi;