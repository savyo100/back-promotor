"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://172.16.17.12:8080", // frontend dev
    "http://localhost:5173",
    "http://10.17.40.246:8080", // se estiver usando Vite
    "https://supervisor-hub-73.onrender.com/",
    "https://supervisor-hub-73.onrender.com/login",
];
// 🔹 Configuração CORS com credentials
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Postman ou backend-to-backend
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS não permitido pelo servidor"));
        }
    },
    credentials: true, // permite cookies ou fetch com 'include'
}));
app.use(express_1.default.json());
// 🔹 Rotas
app.use("/", index_routes_1.default);
app.use('/auth', auth_routes_1.default);
// 🔹 Start server
const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
