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

  getFollow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data)
  },

  getUnfollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response.data)
  },

  getAuthMe() {
    return instance.get(`auth/me`).then((response) => response.data)
  },

  getProfile(profileId) {
    return instance
      .get(`profile/${profileId}`)
      .then((response) => response.data)
  },
}

// так было без инстанса
// export const getUsers = (currentPage, pageSize) => (
//
//    axios.get( baseUrl + `users?page=${currentPage}&count=${pageSize}`
//
//    ).then( response => response.data )
// )
