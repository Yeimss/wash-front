export interface User {
    id: number
    document: number
    name: string
    idEnterprice: number
    enterprice: string
    idRol: number
    rol: string
    password: string
    email: string
    phone: string
}

export interface LoginResponse {
  token: string;
  user: User;
}