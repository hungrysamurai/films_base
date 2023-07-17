import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useGlobalContext } from "./contexts/GlobalContext";
import { useUserContext } from "./contexts/UserContext";

import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SearchResults from "./pages/SearchResults";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const { baseName, lang } = useGlobalContext();
  const { currentUser } = useUserContext();

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to={`${baseName}auth`} />;
  };

  const PublicRoute = ({ children }) => {
    return currentUser ? <Navigate to={`${baseName}profile`} /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseName} element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="tv/:id" element={<MoviePage />} />
          <Route path="search/:query" element={<SearchResults />} />

          <Route
            path="auth"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <section>
                <ErrorMessage
                  componentMessage="404"
                  errorMessage={
                    lang === "en"
                      ? "This page is not exist"
                      : "Такой страницы не существует!"
                  }
                  showImage={true}
                  fullHeight={true}
                />
              </section>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
