import CircularProgress from "@mui/material/CircularProgress";
import { useAxiosLoader } from "use-axios-loader";

import AppRoutes from "routes";
import { axios } from "services/axios.service";
import { AuthProvider } from "components/authContext/AuthContext";

import "./App.css";

function App() {
  const [loading] = useAxiosLoader(axios);

  return (
    <div className={"app"}>
      <AuthProvider>
        {loading && (
          <div className="spinner-wrapper">
            <CircularProgress className="spinner" />
          </div>
        )}
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
