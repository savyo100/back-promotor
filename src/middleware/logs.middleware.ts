import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"

const logDir = path.resolve("logs")
const logFile = path.join(logDir, "access.log")

// cria pasta logs se não existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

export function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now()

  // quando a resposta terminar
  res.on("finish", () => {
    const duration = Date.now() - startTime

    const timestamp = new Date().toISOString()
    const method = req.method
    const url = req.originalUrl
    const status = res.statusCode

    const ip =
      req.ip ||
      (req.headers["x-forwarded-for"] as string) ||
      "127.0.0.1"

    const logLine =
      `[${timestamp}] IP: ${ip} | ${method} ${url} | ` +
      `STATUS: ${status} | TEMPO: ${duration}ms\n`

    fs.appendFileSync(logFile, logLine)
  })

  next()
}
