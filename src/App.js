// eslint-disable-next-line
import { Routes, Route, Navigate } from "react-router-dom";

import { MainLayout } from "./Pages/Layouts/MainLayout";
import { MainPage } from "./Pages/MainPage";
import { LoginPage } from "./Pages/LoginPage";
import { AppPage } from "./Pages/AppPage";
import { Answer } from "./Components/Answer";
import { FormPage } from "./Pages/UnitPages/FormPage";

function App() {
  const isAuth = true;

  function renderApp(isAuth) {
    if (isAuth) {
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainPage />} />
              <Route path="create" element={<FormPage />} />
              <Route path="forms/specific/:formId" element={<Answer />} />
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
