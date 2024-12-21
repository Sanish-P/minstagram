import React from "react";
import AppRouter from "./components/Router";
import ErrorBoundary, { AppError } from "./components/common/ErrorBoundary";

import "public/assets/favs/favicon-32x32.png";

const App: React.FC = () => (
  <ErrorBoundary
    fallback={<AppError onClick={() => window.location.replace("/")} />}
  >
    <AppRouter />
  </ErrorBoundary>
);

export default App;
