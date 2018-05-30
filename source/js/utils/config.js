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
    let baseHost = '.amebae21.hasura-app.io'
    let appName = 'amebae21'

    return {
      authUrl: 'https://auth.' + appName + '.hasura-app.io',
      blogicUrl: 'https://api1.' + appName + '.hasura-app.io',
      gremlinUrl: scheme + '://gremlin' + baseHost,
      catman: scheme + '://catman' + baseHost,
      ordermanUrl: scheme + '://orderman' + baseHost,
      deliverymanUrl: scheme + '://deliveryman' + baseHost,
      socketUrl: 'https://livered' + baseHost
    }
  } else {
    let scheme = window.location.href.split(':')[0]
    let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
    let subdomain = window.location.hostname.split('.')[0]
    let authUrl = subdomain === 'support' || subdomain === 'delivery'
                  ? scheme + '://auth' + baseHost
                  : scheme + '://gremlin' + baseHost

    return {
      authUrl: authUrl,
      blogicUrl: scheme + '://api1' + baseHost,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      ordermanUrl: scheme + '://orderman' + baseHost,
      catman: scheme + '://catman' + baseHost,
      deliverymanUrl: scheme + '://deliveryman' + baseHost,
      socketUrl: scheme + '://livered' + baseHost
    }
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
