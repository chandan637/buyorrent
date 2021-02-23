export default {
  // The secret for the encryption of the jsonwebtoken
  JWTsecret: process.env.JWT_SECRET,
  baseURL: process.env.BASE_URL,
  port: process.env.PORT,
  // The credentials and information for OAuth2
  oauth2Credentials: {
    client_id: process.env.CLIENT_ID,
    project_id: 'test_client', // The name of your project
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'VgU1ldWWAGuVF7NYTCCJ92kE',
    redirect_uris: [`${process.env.BASE_URL}/auth_callback`],
    // scopes: ['https://www.googleapis.com/auth/userinfo.email'],
    scopes: ['profile', 'email'],
  },
};
