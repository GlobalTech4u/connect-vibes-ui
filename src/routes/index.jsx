import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import HomePage from "pages/home/HomePage";
import LoginPage from "pages/login/LoginPage";
import SignupPage from "pages/signup/SignupPage";
import NewsFeedPage from "pages/newsfeed/NewsFeedPage";
import ProfilePage from "pages/profile/ProfilePage";
import { AuthContext } from "components/authContext/AuthContext";

const AppRoutes = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
        >
          <Route index element={<NewsFeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
