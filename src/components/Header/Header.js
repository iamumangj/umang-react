import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { LOGO_URL } from "../../utils/constants";
import { useAuth } from "../../utils/AuthContext";
import useOnlineStatus from "../../utils/hooks/useOnlineStatus";
import "./Header.scss";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnline = useOnlineStatus();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>

      <div className="app-name">Dishcovery</div>
      <div className="nav-items">
        <ul>
          <li className={isActive("/") ? "active" : ""}>
            <Link className="nav-links" to="/">
              Home
            </Link>
          </li>
          <li className={isActive("/about") ? "active" : ""}>
            <Link className="nav-links" to="/about">
              About
            </Link>
          </li>
          <li className={isActive("/contact") ? "active" : ""}>
            <Link className="nav-links" to="/contact">
              Contact
            </Link>
          </li>
          <li
            className={`header-cart-icon ${isActive("/cart") ? "active" : ""}`}
            onClick={() => navigate("/cart")}
            title="View Cart"
          >
            <FaCartArrowDown className="cart-icon" />
          </li>

          {user ? (
            <div className="user-menu">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="login" onClick={() => navigate("/login")}>
              Login
            </button>
          )}

          <div className="online-status">{isOnline ? "🟢" : "🔴"}</div>
        </ul>
      </div>
    </div>
  );
};

export default Header;
