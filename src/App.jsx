import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./contexts/GlobalContext";

import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";

function App() {
  const { baseName } = useGlobalContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={baseName} element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="movies/:id" element={<MoviePage />} />
          <Route path="*" element={<div>some error</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
