import { useContext } from "react";
import { useFormik } from "formik";
import { TextField, Alert, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import LABELS from "constants/label.constant";
import initializeAxios from "services/axios.service";
import initializeSocket from "utils/socket";
import { loginUser } from "reduxStore/slices/authSlice";
import { AuthContext } from "components/authContext/AuthContext";
import { validateLogin } from "helpers/validate.helper";
import { REDUX_ACTION } from "constants/common.constant";
import { MESSAGES } from "constants/message.constant";

import "./Login.css";

const Login = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitSignInForm = async (values) => {
    const payload = {
      email: values?.email,
      password: values?.password,
    };

    dispatch(loginUser(payload))
      .then((res) => {
        if (res?.meta?.requestStatus === REDUX_ACTION.FULFILLED) {
          const user = res?.payload?.user;
          const token = user?.token;
          const refreshToken = user?.refreshToken;
          localStorage.setItem("user", JSON.stringify(user));
          initializeSocket(user?._id);
          initializeAxios(token, refreshToken);
          navigate("/");
        } else {
          toast.error(res?.payload?.message);
        }
      })
      .catch((err) => {
        toast.error(MESSAGES.LOGIN_ERROR);
        setToken("");
        localStorage.removeItem("user");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: submitSignInForm,
    validateOnChange: false,
  });

  const redirectToSignUp = () => navigate("/sign-up");

  const { values, handleChange, handleSubmit } = formik;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-container">
      <div className="left-container">
        <img
          src={"/images/app-logo.png"}
          className="img-fluid"
          alt="App logo"
        />
      </div>
      <div className="right-container">
        <div>
          <span className="title">{LABELS.LOGIN_TITLE}</span>
        </div>
        <form className="form">
          <TextField
            id="email"
            label="Email"
            required={true}
            autoComplete="email"
            defaultValue={values?.email}
            onChange={handleChange}
          />
          {formik.errors.email ? (
            <Alert severity="error">{formik.errors.email}</Alert>
          ) : null}
          <TextField
            id="password"
            label="Password"
            autoComplete="password"
            type="password"
            required={true}
            defaultValue={values?.password}
            onChange={handleChange}
          />
          {formik.errors.password ? (
            <Alert severity="error">{formik.errors.password}</Alert>
          ) : null}

          <Button
            className="primary-button"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </form>
        <p className="footer-text">
          {LABELS.LOGIN_FOOTER}&nbsp;
          <span
            onClick={redirectToSignUp}
            className="footer-link cursor-pointer"
          >
            {LABELS.LOGIN_FOOTER_LINK}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
