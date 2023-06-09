import { DB_PASSWORD, DB_USER } from '../config';

export const dbConnection: {
  url: string;
  options: object;
} = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.he0ewrd.mongodb.net/?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
