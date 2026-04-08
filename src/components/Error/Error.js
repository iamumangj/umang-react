import { Link, useRouteError } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="dishcovery-error">
      <div className="error-card">
        <div className="error-emoji">🍽️</div>

        <h1 className="error-title">Oops! Dish Not Found</h1>

        <p className="error-subtitle">
          Looks like this recipe got burned in the kitchen 🔥
        </p>

        {error && (
          <p className="error-message">
            {error.status} {error.statusText}
          </p>
        )}

        <div className="error-actions">
          <Link to="/" className="primary-btn">
            HomePage
          </Link>

          <button
            className="secondary-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>

      <div className="floating-icons">
        <span>🍕</span>
        <span>🍔</span>
        <span>🍜</span>
        <span>🍩</span>
      </div>
    </div>
  );
};

export default Error;
