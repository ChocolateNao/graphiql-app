import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .test('dot', 'Domain must contain a dot', (value) => {
      const [, domain] = value?.split('@') || [];
      return domain?.includes('.');
    })
    .test(
      'domain',
      'Domain must contain at least two characters after the dot',
      (value) => {
        const [, domain] = value?.split('@') || [];
        const [, ...rest] = domain?.split('.') || [];
        return rest.join('').length >= 2;
      }
    ),
  password: yup
    .string()
    .required()
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value)
    )
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value)
    )
    .test('number', 'Password must contain at least one number', (value) =>
      /\d/.test(value)
    )
    .test(
      'special',
      'Password must contain at least one special character',
      (value) => /[^a-zA-Z0-9]/.test(value)
    )
    .test(
      'length',
      'Password must be at least 8 characters long',
      (value) => value?.length >= 8
    )
    .test(
      'unicode-password',
      'Password must support Unicode characters',
      (value) => (value ? /^[\s\S]*$/u.test(value) : false)
    ),
});

export default loginSchema;
