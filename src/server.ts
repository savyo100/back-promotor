import express from "express";
import routes from './routes/index.routes'; // Importa o arquivo index.routes.ts
import authRoutes from './routes/auth.routes';
const app = express();
app.use(express.json());

// Utiliza as rotas centralizadas no index.routes.ts
app.use("/", routes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT,'0.0.0.0' () =>
  console.log(`Server running on port {PORT}`)
);
