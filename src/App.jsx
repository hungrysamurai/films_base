import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageWrapper from "./components/PageWrapper";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
