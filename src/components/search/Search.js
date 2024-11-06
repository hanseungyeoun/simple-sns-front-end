import { useState } from "react";
import { useForm } from 'react-hook-form';
import Modal from '../../components/Modal'

export default function Search({ data, hashtag, onSubmit, onChange }) {
  const [currentPost, setCurrentPost] = useState(null);

  const { register, handleSubmit } = useForm();
  const openModal = (post) => {
    setCurrentPost(post)
  }

  const closeModal = () => {
    setCurrentPost(null);
  }

  return (
    <>
      <div id="container" className="container">
        <div className="common-inner">
          <div className="search-area">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <input {...register("hashtag", { required: true, onChange: onChange, value: hashtag })} className="search-input" type="text" placeholder="검색어를 입력하세요." />
              <button className="btn-small btn-solid-gray">검색</button>
            </form>
          </div>
          <div className="search-result-area">
            {
              (data === null || data.content.length === 0) ? <div className="no-result">검색 결과가 없습니다.</div> : (
                <>
                  <p className="mgb16">검색결과 <b>{data?.content?.length} 개</b></p>
                  <div className="thumb-view">
                    <ul className="thumb-list">
                      {data?.content?.map(post => {
                        return <li key={post.id} onClick={() => openModal(post)} className="thumb-item"><img src={post.postImage} alt="" /></li>
                      })}
                    </ul>
                  </div>
                </>
              )
            }
          </div>
        </div>
        {
          currentPost && <Modal post={currentPost} onClose={closeModal} />
        }
      </div>
    </>
  )
}