export interface FormRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface FormReset {
  email: string;
}
