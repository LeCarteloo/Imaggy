import * as yup from 'yup';

// Minimum eight characters, at least one letter, one number and one special character
const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Current password must be at least 8 characters')
    .max(24, 'Current password must be at most 24 characters')
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, 'Current password must be at least 8 characters')
    .max(24, 'Current password must be at most 24 characters')
    .matches(passwordRule, {
      message: `Password should have at least eight characters, at least one letter,
         one number and one special character`,
    })
    .required('New password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Password must match')
    .required('Repeat password is required'),
});
