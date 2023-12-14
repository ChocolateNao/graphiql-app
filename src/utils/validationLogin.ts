import * as yup from 'yup';

const loginSchema = yup.object().shape({
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
  password: yup
    .string()
    .required('yup.password.required')
    .test('lowercase', 'yup.password.lowercase', (value) => /[a-z]/.test(value))
    .test('uppercase', 'yup.password.uppercase', (value) => /[A-Z]/.test(value))
    .test('number', 'yup.password.number', (value) => /\d/.test(value))
    .test('special', 'yup.password.special', (value) =>
      /[^a-zA-Z0-9]/.test(value)
    )
    .test('length', 'yup.password.length', (value) => value?.length >= 8)
    .test('unicode-password', 'yup.password.unicode-password', (value) =>
      value ? /^[\s\S]*$/u.test(value) : false
    ),
});

export default loginSchema;
