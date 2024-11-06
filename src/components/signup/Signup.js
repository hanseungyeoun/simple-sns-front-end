import { useForm } from 'react-hook-form'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { join } from '../../api/users'

export default function SignupContainer({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (<div id="container" className="container flx-jc">
    <div className="form-inner">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="form-container">
        <fieldset>
          <legend>회원가입</legend>

          <h1 className="form-title">회원가입</h1>

          <div className="form-group">
            <input className={classNames('form-input', errors.email && 'error')} type="email"
              {...register('email', { required: true })} placeholder="이메일 주소" aria-label="이메일 주소 입력창" />
          </div>

          <div className="form-group mgt8">
            <input className={classNames('form-input', errors.nickName && 'error')} type="text"
              {...register('nickName', { required: true })} placeholder="닉네임" aria-label="닉네임 입력창" />
            {errors.nickname && <p className="txt-error">닉네임을 입력해주세요.</p>}
          </div>

          <div className="form-group mgt8">
            <input className={classNames('form-input', errors.password && 'error')} type="password"
              {...register('password', { required: true })} placeholder="비밀번호" aria-label="비밀번호 입력창" />
            {errors.password && <p className="txt-error">비밀번를 입력해주세요.</p>}
          </div>

          <button className="btn-large btn-solid-primary mgt32">회원가입</button>
        </fieldset>
      </form>

      <p className="mgt16 color-gray3 center">이미 계정이 있으신가요? <a href="../../docs/page/login.html" className="underline">로그인</a></p>
    </div>
  </div>
  )
}