import axios from 'axios'
import { ProfileType } from '../types/types'

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    'API-KEY': '722eebd2-9ab6-4fa7-966c-e044f7d55617',
  },
})

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data)
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => response.data)
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => response.data)
  },
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: { id: number; email: string; login: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type LoginResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data)
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },
  logout() {
    return instance.delete(`auth/login`)
  },
}

export const profileAPI = {
  getProfile(profileId: number) {
    return instance.get(`profile/${profileId}`)
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status })
  },

  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  saveProfile(profileData: ProfileType) {
    return instance.put('profile', profileData)
  },
}

export const securityAPI = {
  getCaptcha() {
    return instance.get('security/get-captcha-url')
  },
}
