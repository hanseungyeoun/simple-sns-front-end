import { Routes, Route } from "react-router-dom";
import PostsContainer from '../features/posts/PostsContainer.js';
import SignupContainer from '../features/signup/SignupContainer.js';
import LoginContainer from "../features/login/LoginContainer.js";
import WriteContainer from "../features/posts/WriteContainer.js";
import MyContainer from "../features/posts/MyContainer.js";
import SearchContainer from "../features/posts/SearchContainer.js";

export const Router = () => {
  return (
    <Routes>
      <Route exact path="/signup" element={<SignupContainer />} />
      <Route exact path="/login" element={<LoginContainer />} />
      <Route exact path="/write" element={<WriteContainer />} />
      <Route exact path="/my" element={<MyContainer />} />
      <Route exact path="/search" element={<SearchContainer />} >
        <Route exact path="/search:hashtag" element={<SearchContainer />} />
      </Route>
      <Route exact path="/" element={<PostsContainer />} />
    </Routes>
  );
};
export default Router;
