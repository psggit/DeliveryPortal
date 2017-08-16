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
    host: "",
    api_version: ""
  },

  "staging": {
    host: "",
    api_version: ""
  },

  "production": {
    host: "",
    api_version: ""
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
