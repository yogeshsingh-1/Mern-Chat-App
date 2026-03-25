import { useRouteError } from "react-router-dom";
import { useEffect } from "react";
const ErrorBoundary = () => {
  const error = useRouteError();

  // Log to your error tracking service
  useEffect(() => {
    console.error("Route error:", error);
    // Send to Sentry, LogRocket, etc.
    // trackError(error);
  }, [error]);

  if (error.status === 404) {
    return <NotFound />;
  }

  if (error.status === 403) {
    return <AccessDenied />;
  }

  return (
    <div className="error-container">
      <h1>Unexpected Error</h1>
      <p>Our team has been notified</p>
      <button onClick={() => (window.location.href = "/")}>Go Home</button>
    </div>
  );
};
export default ErrorBoundary;
