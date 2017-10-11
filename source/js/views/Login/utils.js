export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
  // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
  const rolesMap = {
    "user": 1,
    "admin": 6,
    "support_person": 3,
    "support_admin": 5,
    "support_team_leader": 4,
    "excise_person": 2,
    "support_master": 6,
    "delivery_support_person": 3
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for(let i=0; i<hasuraRoles.length; i++) {
    if (maxRole < rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

export function getAuthToken(data) {
  const token = data.auth_token
  return token
}

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

// setCookie(cname, cvalue, exdays = 365) {
//   const d = new Date()
//   d.setTime(d.getTime() + (exdays*24*60*60*1000))
//   const expires = "expires=" + d.toUTCString()
//   document.cookie = `${cname}=${cvalue}; ${expires}`
// }

export function createSession(data) {
  localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem('auth-token', getAuthToken(data))
  localStorage.setItem('hasura-id', getHasuraId(data))
  // this.setCookie('dinoisses', this.getAuthToken(data))
  // function getCookie(cname) {
  //   var name = cname + "="
  //   var ca = document.cookie.split(';')
  //   for(var i=0; i<ca.length; i++) {
  //       var c = ca[i]
  //       while (c.charAt(0)==' ') c = c.substring(1)
  //       if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
  //   }
  //   return ""
  // }
}