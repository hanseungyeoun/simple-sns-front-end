import { useForm } from 'react-hook-form'
import classNames from 'classnames';

export default function Login({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div id="container" className="container flx-jc">
        <div className="form-inner">
          <form action="" className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend>로그인</legend>

              <h1 className="form-title">로그인</h1>

              <div className="form-group">

                <input
                  className={classNames('form-input', errors.email && 'error')}
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="이메일 주소"
                  aria-label="이메일 주소 입력창"
                />
                {errors.email && <p className="txt-error">이메일을 입력해주세요.</p>}
              </div>

              <div className="form-group mgt8">
                <input
                  className={classNames('form-input', errors.password && 'error')}
                  type="password"
                  {...register('password', { required: true })}
                  placeholder="비밀번호"
                  aria-label="비밀번호 입력창"
                />
                {errors.password && <p className="txt-error">비밀번를 입력해주세요.</p>}
              </div>

              <button className="btn-large btn-solid-primary mgt32">로그인</button>
            </fieldset>
          </form>

          <p className="mgt16 color-gray3 center">
            계정이 없으신가요?
            <a href="../../docs/page/signup.html" className="underline">회원가입</a>
          </p>
        </div>
      </div>
    </>
  )
}