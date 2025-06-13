// config.js
const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://ml-model-sortify-production.up.railway.app' 
    : 'http://localhost:8000',
};

export default config;