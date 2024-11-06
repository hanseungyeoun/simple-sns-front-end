export default function Comment({ comment }) {
  console.log(comment)
  return (
    <li className="comment-item">
      <a className="fw700" href="#">{comment.nickName}</a>
      &nbsp;
      <span>{comment.comment}</span>
    </li >
  )
};