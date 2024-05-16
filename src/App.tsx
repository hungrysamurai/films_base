import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PageWrapper from './components/PageWrapper';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import SearchResults from './pages/SearchResults';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ErrorMessage from './components/ErrorMessage';
import { Lang } from './types';
import getBaseURL from './utils/getBaseURL';

import useCheckUserAuth from './hooks/useCheckUserAuth';

import { getCurrentLang } from './store/slices/mainSlice';
import { useAppSelector } from './store/hooks';

function App() {
  const lang = useAppSelector(getCurrentLang);

  const { currentUser } = useCheckUserAuth();

  const ProtectedRoute = ({ children }: ReactChildrenType) => {
    return currentUser ? children : <Navigate to={getBaseURL('auth')} />;
  };

  const PublicRoute = ({ children }: ReactChildrenType) => {
    return currentUser ? <Navigate to={getBaseURL('profile')} /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={getBaseURL()} element={<PageWrapper />}>
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
                    lang === Lang.En
                      ? 'This page is not exist'
                      : 'Такой страницы не существует!'
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
