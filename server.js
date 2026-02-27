import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----- COLORS -----
const color = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

const methodColor = (method) => {
  switch (method) {
    case "GET": return color.green;
    case "POST": return color.cyan;
    case "PUT": return color.yellow;
    case "DELETE": return color.red;
    default: return color.reset;
  }
};

const app = express();
const PORT = process.env.PORT || 3000;

// ----- BANNER -----
console.log(`${color.cyan}${color.bold}
     ██╗ █████╗ ██╗   ██╗███████╗██████╗     ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
     ██║██╔══██╗██║   ██║██╔════╝██╔══██╗    ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
     ██║███████║██║   ██║█████╗  ██║  ██║    ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
██   ██║██╔══██║╚██╗ ██╔╝██╔══╝  ██║  ██║    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
╚█████╔╝██║  ██║ ╚████╔╝ ███████╗██████╔╝    ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
 ╚════╝ ╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═════╝     ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
                                                                                              
${color.reset}`);

console.log(`${color.magenta}${color.bold}⚡ KB DIGITAL STUDIO | Developed by JAVED & Khajan ⚡${color.reset}\n`);

// ----- LOGGING -----
app.use((req, res, next) => {
  const start = Date.now();
  const mColor = methodColor(req.method);

  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500 ? color.red :
      res.statusCode >= 400 ? color.yellow :
      color.green;

    console.log(
      `${color.bold}[${new Date().toLocaleTimeString()}]${color.reset} ` +
      `${mColor}${req.method}${color.reset} ` +
      `${color.blue}${req.url}${color.reset} ` +
      `${statusColor}${res.statusCode}${color.reset} ` +
      `${color.magenta}${duration}ms${color.reset}`
    );
  });

  next();
});

// Serve dist
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`${color.green}✅ Server running at http://localhost:${PORT}${color.reset}`);
});
