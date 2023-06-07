import { config } from 'dotenv';

config({ path: '.env' });


export const {
  DB_USER,
  DB_PASSWORD
} = process.env;
