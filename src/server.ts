import express from "express";
import cors from "cors";
import routes from './routes/index.routes';
import authRoutes from './routes/auth.routes';

const app = express();

const allowedOrigins = [
  "http://172.16.17.12:8080", // frontend dev
  "http://localhost:5173",
  "http://10.17.40.246:8080",// se estiver usando Vite
  "https://supervisor-hub-73.onrender.com/",
  "http://192.168.137.227:8080",
  "https://supervisor-hub-73.onrender.com/login",
  "http://192.168.194.26:8080",
];

// 🔹 Configuração CORS com credentials
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman ou backend-to-backend
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS não permitido pelo servidor"));
    }
  },
  credentials: true, // permite cookies ou fetch com 'include'
}));

app.use(express.json());

// 🔹 Rotas
app.use("/", routes);
app.use('/auth', authRoutes);

// 🔹 Start server
const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
