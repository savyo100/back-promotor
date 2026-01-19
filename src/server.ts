import express from "express";
import routes from './routes/index.routes'; // Importa o arquivo index.routes.ts
import authRoutes from './routes/auth.routes';
const app = express();
app.use(express.json());

// Utiliza as rotas centralizadas no index.routes.ts
app.use("/", routes);
app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
