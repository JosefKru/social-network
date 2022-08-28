import * as axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    'API-KEY': 'ed294fca-808a-48e3-a814-9dd8d2b97cda',
  },
})

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },

  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data)
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response.data)
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe })
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}

export const profileAPI = {
  getProfile(profileId) {
    return instance.get(`profile/${profileId}`)
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },

  updateStatus(status) {
    return instance.put(`profile/status`, { status: status })
  },
}

// так было без инстанса
// export const getUsers = (currentPage, pageSize) => (
//
//  axios.get( baseUrl + `users?page=${currentPage}&count=${pageSize}`
//
//    ).then( response => response.data )
// )
