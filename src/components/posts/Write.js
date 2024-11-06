import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Write({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [thumbnail, setThumbnail] = useState('');

  const onChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div id="container" className="container write-container">
      <div className="common-inner">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-content">
            <div className="img-preview-area">
              {thumbnail ?
                <img src={thumbnail} alt="" className="img-preview" />
                : <label htmlFor="img-upload" className="txt-preview">여기를 눌러 이미지를 등록하세요.</label>
              }
            </div>
            <div className="form-area">
              {/* <input id="img-upload" className="form-file" type="file" /> */}
              <input id="img-upload" {...register("thumbnail", { onChange: onChange })} className="form-file" type="file" />
              <textarea  {...register("content")} className="form-textarea" placeholder="사진에 대한 설명을 적어주세요."></textarea>
              <button className="btn-large btn-solid-primary">등록</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}