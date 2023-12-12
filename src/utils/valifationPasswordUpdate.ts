import * as yup from 'yup';

import { confirmPasswordSchema, passwordSchema } from './validation';

const passwordUpdateSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export default passwordUpdateSchema;
