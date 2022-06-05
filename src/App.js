// eslint-disable-next-line
import { Routes, Route, Navigate } from "react-router-dom";

import { MainLayout } from "./Pages/Layouts/MainLayout";
import { MainPage } from "./Pages/MainPage";
import { LoginPage } from "./Pages/LoginPage";
import { AppPage } from "./Pages/AppPage";

function App() {
  const isAuth = true;

  function renderApp(isAuth) {
    if (isAuth) {
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="app" element={<AppPage />} />
            </Route>
          </Routes>
        </div>
      );
    } else if (!isAuth) {
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="app" element={<AppPage />} />
            </Route>
          </Routes>
        </div>
      );
    }
  }

  return renderApp(isAuth);
}

export default App;
