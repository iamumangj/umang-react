import "./UserOffline.scss";

const UserOffline = () => {
  return (
    <div className="offline-wrapper">
      <div className="offline-card">
        <div className="offline-icon">📡</div>

        <h1>You're Offline</h1>

        <p>
          Oops! Looks like your internet connection is lost. <br />
          Please check your network and try again.
        </p>

        <button onClick={() => window.location.reload()}>
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default UserOffline;
