export default ({ env }) => ({
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET', 'your-generated-jwt-secret-here'),
        salt: env('API_TOKEN_SALT', 'your-generated-api-token-salt-here'),
      },
    },
  });