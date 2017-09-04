function login(data, redirect = '/orders') {
  create(data)  
  window.location.href = redirect
}

function create(data) {
  if(!data) {
    throw new Error(
      "`data` is required to create a session." +
      "`data` must be a plain object"
    )
  }
  storage.set(data)
}

function destroy() {
  Storage.clear()
}

function logout(redirect = '/') {
  destroy()
  window.location.href = redirect
}

function getItem(item) {
  return storage.get(item)
}


export const Session = {
  create,
  destroy,
  login,
  logout,
  getItem
}