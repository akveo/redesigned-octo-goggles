import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import { AppLayout } from "./components/layout";
import DraftLogsPage from "./pages/DraftLogsPage";
import HomePage from "./pages/HomePage";
import { Routes } from "./routing/routes";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <RouterRoutes>
          <Route path={Routes.HOME} element={<HomePage />} />
          <Route path={Routes.DRAFTS} element={<DraftLogsPage />} />
          <Route path="*" element={<Navigate to={Routes.HOME} />} />
        </RouterRoutes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
