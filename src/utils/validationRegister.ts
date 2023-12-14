import * as yup from 'yup';

import {
  confirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from './validation';

const registerSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export default registerSchema;
