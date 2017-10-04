/**
 * # Config
 * (module_name = config)
 */
// const env = process.env.NODE_ENV;

// /**
//  * # runtime config
//  * holds all config values based on runtime environment
//  */
// const RUNTIME__CONFIG = {
//   "development": {
//     host: "https://gremlin.hearsay81.hasura-app.io",
//     api_version: ""
//   },

//   "staging": {
//     host: "https://gremlin.hearsay81.hasura-app.io",
//     api_version: ""
//   },

//   "production": {
//     host: "https://gremlin.hearsay81.hasura-app.io",
//     api_version: ""
//   }
// }

// function getHostServer() {
//   let config = RUNTIME__CONFIG[env]
//   return config.host
// }

// // creates base API url
// function getApiBaseUrl() {
//   let config = RUNTIME__CONFIG[env]
//   return config.host + config.api_version
// }

function getAPIObj() {
  if (window.location.href.split(':')[1] === '//localhost') {
    let scheme = 'https'
    let baseHost = '.hearsay81.hasura-app.io'
    let appName = 'hearsay81'

    return {
      authUrl: 'https://auth.' + appName + '.hasura-app.io',
      blogicUrl: 'https://api1.' + appName + '.hasura-app.io',
      gremlinUrl: scheme + '://gremlin' + baseHost,
      socketUrl: 'https://livered' + baseHost
    }
  } else {
    let scheme = window.location.href.split(':')[0]
    let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
    let subdomain = window.location.hostname.split('.')[0]
    let authUrl = subdomain === 'support'
                  ? scheme + '://auth' + baseHost
                  : scheme + '://gremlin' + baseHost
    return {
      authUrl: authUrl,
      blogicUrl: scheme + '://api1' + baseHost,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      socketUrl: scheme + '://livered' + baseHost
    }
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()