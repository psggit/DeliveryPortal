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
    host: "https://gremlin.hearsay81.hasura-app.io",
    api_version: ""
  },

  "staging": {
    host: "https://gremlin.hearsay81.hasura-app.io",
    api_version: ""
  },

  "production": {
    host: "https://gremlin.hearsay81.hasura-app.io",
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

if (window.location.href.split(':')[1] === '//localhost') {
  authUrl = 'https://auth.' + appName + '.hasura-app.io';
  blogicUrl = 'https://api1.' + appName + '.hasura-app.io';
  gremlinUrl = scheme + '://gremlin' + baseHost;
} else {
  scheme = window.location.href.split(':')[0];
  baseHost = window.location.hostname.match(/.*?(\..*)/)[1];
  authUrl = scheme + '://auth' + baseHost;
  blogicUrl = scheme + '://api1' + baseHost;
  gremlinUrl = scheme + '://gremlin' + baseHost;
}

export const api_base_url = getApiBaseUrl()
export const host_server = getHostServer()
