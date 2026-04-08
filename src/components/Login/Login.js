import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import "./Login.scss";

// Validation schema for login
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

// Validation schema for signup
const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required field")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setAuthError("");

    let result;

    if (isSignup) {
      result = signup(values.email, values.password, values.name);
    } else {
      result = login(values.email, values.password);
    }

    setLoading(false);

    if (result.success) {
      // Navigate to home after successful login/signup
      setTimeout(() => {
        navigate("/");
      }, 500);
    } else {
      setAuthError(result.error);
    }

    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Tab Buttons */}
        <div className="tab-buttons">
          <button
            className={`tab-btn ${!isSignup ? "active" : ""}`}
            onClick={() => {
              setIsSignup(false);
              setAuthError("");
            }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${isSignup ? "active" : ""}`}
            onClick={() => {
              setIsSignup(true);
              setAuthError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <Formik
          enableReinitialize={true}
          validationSchema={isSignup ? signupSchema : loginSchema}
          initialValues={
            isSignup
              ? { name: "", email: "", password: "" }
              : { email: "", password: "" }
          }
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit: formikHandleSubmit,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={formikHandleSubmit}>
              <span>{isSignup ? "Create Account" : "Login"}</span>

              {/* Name field for signup */}
              {isSignup && (
                <>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter your full name"
                    className="form-control"
                    id="name"
                    disabled={loading}
                  />
                  <p className="error">
                    {errors.name && touched.name && errors.name}
                  </p>
                </>
              )}

              {/* Email field */}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter your email"
                className="form-control inp_text"
                id="email"
                disabled={loading}
              />
              <p className="error">
                {errors.email && touched.email && errors.email}
              </p>

              {/* Password field */}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter your password"
                className="form-control"
                id="password"
                disabled={loading}
              />
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>

              {/* Auth error message */}
              {authError && <p className="error auth-error">{authError}</p>}

              {/* Submit button */}
              <button type="submit" disabled={loading || isSubmitting}>
                {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
              </button>

              {/* Demo credentials hint */}
              {!isSignup && (
                <div className="demo-info">
                  <p>📝 Demo Credentials:</p>
                  <p>📧 john@example.com</p>
                  <p>🔑 password123</p>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
