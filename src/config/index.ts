import { config } from 'dotenv';

config({ path: '.env' });


export const {
  DB_USER,
  DB_PASSWORD,
  AUTH_SECRET,
  VALIDATION_PASSWORD
} = process.env;
