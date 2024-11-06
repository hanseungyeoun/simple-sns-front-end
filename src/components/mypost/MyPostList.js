import { useState } from 'react'
import Pagination from '../pagination/Pagination'
import Profile from "../profile/Profile";
import Modal from '../Modal'

export default function MyPostsList({ data, currentPage, size, onChange }) {
  const [currentPost, setCurrentPost] = useState(null);
  const openModal = (post) => {
    setCurrentPost(post)
  }

  const closeModal = () => {
    setCurrentPost(null);
  }

  return (
    <>
      <div id="container" class="container thumb-container">
        <div class="common-inner">
          <Profile></Profile>
          <div class="thumb-view">
            <ul class="thumb-list">
              {data?.content.map((post) => {
                return <li key={post.id} class="thumb-item" onClick={(post) => openModal(openModal)}>
                  <img src={post.postImage} alt="" />
                </li>
              })}
            </ul>
          </div>
          <div class="pagination-area">
            <div class="pagination-area">
              {
                data?.content && <Pagination currentPage={currentPage} size={size} totalCount={data.totalElements} totalPages={data.totalPages} onChange={onChange}></Pagination>
              }
            </div>
          </div>
        </div>
        {
          currentPost && <Modal post={currentPost} onClose={closeModal} />
        }

      </div >
    </>
  )
}