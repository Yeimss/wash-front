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

export interface LoginInner {
  token: string;
  user: User;
}

export interface LoginResponse {
  data: LoginInner;
  message: string;
  statusCode: number;
  success: boolean;
}
