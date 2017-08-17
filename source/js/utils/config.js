/**
 * # Config
 * (module_name = config)
 */
const env = process.env.NODE_ENV;

/**
 * # runtime config
 * holds all config values based on runtime environment
 */
const RUNTIME__CONFIG = {
  "development": {
    host: "https://finn.local:8080",
    api_version: "/api/v1"
  },

  "staging": {
    host: "https://api.hipbar.in",
    api_version: "/api/v1"
  },

  "production": {
    host: "https://api.hipbar.com",
    api_version: "/api/v1"
  }
}

function getHostServer() {
  let config = RUNTIME__CONFIG[env]
  return config.host
}

// creates base API url
function getApiBaseUrl() {
  let config = RUNTIME__CONFIG[env]
  return config.host + config.api_version
}

export const api_base_url = getApiBaseUrl()
export const host_server = getHostServer()
