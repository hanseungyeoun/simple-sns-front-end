import { useDispatch } from 'react-redux'
import { usersAction } from '../../modules/users/usersSlice'
import Login from '../../components/login/Login'

export default function LoginContainer() {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(usersAction.login(data));
  }
  return (
    <>
      <Login onSubmit={onSubmit}></Login>
    </>
  )
}