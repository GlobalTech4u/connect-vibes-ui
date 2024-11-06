import CircularProgress from "@mui/material/CircularProgress";
import { useAxiosLoader } from "use-axios-loader";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppRoutes from "routes";
import { axios } from "services/axios.service";
import { AuthProvider } from "components/authContext/AuthContext";
import store from "reduxStore/store";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [loading] = useAxiosLoader(axios);

  return (
    <div className={"app"}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
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
