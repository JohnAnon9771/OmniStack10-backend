import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();

mongoose.connect(
  'mongodb+srv://john:joaoneto456@omni-jbrj2.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
);

app.use(express.json());
app.use(routes);

export default app;
