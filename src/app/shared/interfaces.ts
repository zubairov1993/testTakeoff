export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Contact {
  id?: string
  name: string
  phone: string
  email: string
}
