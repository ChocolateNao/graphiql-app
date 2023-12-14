import * as yup from 'yup';

const resetSchema = yup.object().shape({
  email: yup
    .string()
    .required('yup.email.required')
    .email('yup.email.valid')
    .test('dot', 'yup.email.dot', (value) => {
      const [, domain] = value?.split('@') || [];
      return domain?.includes('.');
    })
    .test('domain', 'yup.email.domain', (value) => {
      const [, domain] = value?.split('@') || [];
      const [, ...rest] = domain?.split('.') || [];
      return rest.join('').length >= 2;
    }),
});

export default resetSchema;
