import * as yup from 'yup';

import { emailSchema } from './validation';

const resetSchema = yup.object().shape({
  email: emailSchema,
});

export default resetSchema;
