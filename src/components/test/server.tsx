import React from "react";

const TestServer: React.FC = () => {
  return (
    <div>
      <h1>Test Server</h1>
      <div>
        <p className="font-light">
          NEXTAUTH_KEYCLOAK_CLIENT_ID:{" "}
          <span className="font-medium">
            {process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID}
          </span>{" "}
        </p>
        <p className="font-light">
          NEXTAUTH_KEYCLOAK_CLIENT_SECRET:{" "}
          <span className="font-medium">
            {process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET}
          </span>{" "}
        </p>{" "}
        <p className="font-light">
          NEXTAUTH_KEYCLOAK_ISSUER:{" "}
          <span className="font-medium">
            {process.env.NEXTAUTH_KEYCLOAK_ISSUER}
          </span>{" "}
        </p>{" "}
        <p className="font-light">
          NEXTAUTH_URL:{" "}
          <span className="font-medium">{process.env.NEXTAUTH_URL}</span>{" "}
        </p>{" "}
        <p className="font-light">
          NEXTAUTH_SECRET:{" "}
          <span className="font-medium">{process.env.NEXTAUTH_SECRET}</span>{" "}
        </p>{" "}
        <p className="font-light">
          NEXTAUTH_BACKEND_URL:{" "}
          <span className="font-medium">
            {process.env.NEXTAUTH_BACKEND_URL}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default TestServer;
