import React from "react";
// eslint-disable-next-line
import { Routes, Route, Navigate } from "react-router-dom";

import { MainLayout } from "./Pages/Layouts/MainLayout";
import { MainPage } from "./Pages/MainPage";

function App() {
  const isAuth = true;

  function renderApp(isAuth) {
    if (isAuth) {
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </div>
      );
    } else if (!isAuth) {
      return <div className="App">Hello! Not logged 😭</div>;
    }
  }

  return renderApp(isAuth);
}

export default App;
