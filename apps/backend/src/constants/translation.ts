import { ERROR_TYPES } from 'src/types';

export const ERROR_TRANSLATIONS: Record<
  'en' | 'uz',
  Record<keyof typeof ERROR_TYPES, string>
> = {
  en: {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    REGISTRATION_PROBLEM: 'There was a problem with your registration',
    LOGIN_PROBLEM: 'There was a problem with your login',
  },
  uz: {
    USER_NOT_FOUND: 'Foydalanuvchi topilmadi',
    INVALID_CREDENTIALS: "Noto'g'ri ma'lumotlar",
    EMAIL_ALREADY_EXISTS: 'Elektron pochta allaqachon mavjud',
    REGISTRATION_PROBLEM: "Ro'yxatdan o'tishda muammo yuz berdi",
    LOGIN_PROBLEM: 'Kirishda muammo yuz berdi',
  },
};
