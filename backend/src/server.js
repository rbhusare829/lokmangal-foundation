import "dotenv/config";
import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import "./models/AdminUser.js";
import "./models/GalleryImage.js";
import "./models/Testimonial.js";
import "./models/TeamMember.js";
import "./models/Project.js";
import "./models/Event.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Database connected (${sequelize.getDialect()})`);

    app.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
