import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./contexts/GlobalContext";

import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SearchResults from "./pages/SearchResults";

function App() {
  const { baseName } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseName} element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="tv/:id" element={<MoviePage />} />
          <Route path="search/:query" element={<SearchResults />} />
          <Route path="*" element={<div>some error</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
