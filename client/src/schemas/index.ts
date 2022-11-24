import * as yup from 'yup';

// Minimum eight characters, at least one letter, one number and one special character
const passwordRule =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const generalSettingsSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be at least 5 characters')
    .max(14, 'Name must be at most 14 characters')
    .required('Name is required'),
  surname: yup
    .string()
    .min(5, 'Surname must be at least 5 characters')
    .max(14, 'Surname must be at most 14 characters')
    .required('Surname is required'),
  email: yup.string().email().required('Email is required'),
  username: yup
    .string()
    .min(5, 'Surname must be at least 5 characters')
    .max(14, 'Surname must be at most 14 characters')
    .required('Surname is required'),
  location: yup.string().max(24, 'Location must be at most 24 characters'),
  interest: yup.array().max(7).of(yup.string()),
  skills: yup.array().max(7).of(yup.string()),
  bio: yup.string().max(250, 'Bio must be at most 250 characters'),
  website: yup.string().url('Portfolio website should be a correct url'),
  instagram: yup.string().min(3).max(30),
  facebook: yup.string().min(5).max(50),
});

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

export const closeAccountSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Current password must be at least 8 characters')
    .max(24, 'Current password must be at most 24 characters')
    .required('Current password is required'),
});
