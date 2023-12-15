import * as yup from 'yup';

import { emailSchema, passwordSchema } from './validation';

const loginSchema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export default loginSchema;
