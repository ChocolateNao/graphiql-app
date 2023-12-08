import * as yup from 'yup';

const resetSchema = yup.object().shape({
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
});

export default resetSchema;
