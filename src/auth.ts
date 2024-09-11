import KeycloakProvider from "next-auth/providers/keycloak";

// this will refresh an expired access token, when needed
async function refreshAccessToken(token) {
  const resp = await fetch(
    `${process.env.NEXTAUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID ?? "keycloak",
        client_secret:
          process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET ?? "keycloak",
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    }
  );

  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: `${process.env.NEXTAUTH_KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.NEXTAUTH_KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.NEXTAUTH_KEYCLOAK_ISSUER}`,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = account.access_token;
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      // Send properties to the client
      session.access_token = token.access_token; // see utils/sessionTokenAccessor.js
      session.id_token = token.id_token; // see utils/sessionTokenAccessor.js
      // session.roles = token.decoded.realm_access.roles;
      session.error = token.error;
      return session;
    },
  },
};
