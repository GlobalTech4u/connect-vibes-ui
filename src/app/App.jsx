import CircularProgress from "@mui/material/CircularProgress";
import { useAxiosLoader } from "use-axios-loader";
import { Provider } from "react-redux";

import AppRoutes from "routes";
import { axios } from "services/axios.service";
import { AuthProvider } from "components/authContext/AuthContext";
import store from "reduxStore/store";

import "./App.css";

function App() {
  const [loading] = useAxiosLoader(axios);

  return (
    <div className={"app"}>
      <Provider store={store}>
        <AuthProvider>
          {loading && (
            <div className="spinner-wrapper">
              <CircularProgress className="spinner" />
            </div>
          )}
          <div data-testid="app-routes">
            <AppRoutes />
          </div>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
