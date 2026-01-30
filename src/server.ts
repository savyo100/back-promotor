import express from "express";
import cors from "cors";
import routes from './routes/index.routes';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", routes);
app.use('/auth', authRoutes);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server running on port ${PORT}`)
);
