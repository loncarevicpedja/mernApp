import "./App.css";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import CreateExhibition from "./pages/CreateExhibition";
import ExhibitionPage from "./pages/ExhibitionPage";
import RegisterPage from "./pages/RegisterPage";
import NewsPage from "./pages/NewsPage";
import CreateNews from "./pages/CreateNews";
import VerificationPage from "./pages/VerificationPage";
import UserPage from "./pages/UserPage";
import AllUSers from "./pages/AllUsersPage";
import EditUser from "./pages/EditUserPage";
import ChangePassword from "./pages/ChangePassword";
import AllNews from "./pages/AllNewsPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/exhibition" element={<CreateExhibition />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/exhibition/:id" element={<ExhibitionPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/news" element={<CreateNews />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/verify/:userId" element={<VerificationPage />} />
          <Route path="/profile/:id" element={<UserPage />} />
          <Route path="/users" element={<AllUSers />} />
          <Route path="/user/:id" element={<EditUser />} />
          <Route path="/changepassword/:id" element={<ChangePassword />} />
          <Route path="/allnews" element={<AllNews />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
