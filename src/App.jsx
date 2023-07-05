import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useGlobalContext } from "./contexts/GlobalContext";
import { useUserContext } from "./contexts/UserContext";

import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SearchResults from "./pages/SearchResults";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

function App() {

  const { baseName } = useGlobalContext();
  const { currentUser } = useUserContext();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/auth'/>
  }

  const UserRedirect = ({ children }) => {
    return currentUser ? <Navigate to='/profile'/> : children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseName} element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="tv/:id" element={<MoviePage />} />
          <Route path="search/:query" element={<SearchResults />} />

          <Route path="auth" element={<AuthPage/>} />

          <Route path="profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          } />

          <Route path="*" element={<div>some error</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
