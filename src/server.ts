import express from "express";
import userRoutes from "./routes/user.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import authRoutes from "./routes/auth.routes.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { prisma } from "./config/prisma.js";


const app = express();
const PgSession = connectPgSimple(session);


const PORT = 5000;

app.use(express.json());

app.use(
  session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true
    }),

    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Login backend is running!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
