import { Outlet, useOutletContext } from "react-router-dom";

import Header from "./header/Header";
import { useState } from "react";
import { MediaType } from "../types";

// TEMP WORKAROUND
type ContextType = { currentMediaType: MediaType };

const PageWrapper: React.FC = () => {
  // TEMP WORKAROUND
  const [currentMediaType, setCurrentMediaType] = useState<MediaType>(
    MediaType.Movie
  );

  return (
    <div className="page-wrapper">
      <div className="bg-noise-container"></div>
      <Header setCurrentMediaType={setCurrentMediaType} />
      <Outlet context={{ currentMediaType } satisfies ContextType} />
    </div>
  );
};

export function useGetCurrentMediaType() {
  return useOutletContext<ContextType>();
}

export default PageWrapper;
