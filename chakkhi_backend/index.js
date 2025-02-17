import app from "./app.js";
import DatabaseConnection from "./config/dataBase.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

DatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Database connection failed:", err);
    process.exit(1);
  });

//   import app from "./app.js";
// import DatabaseConnection from "./config/dataBase.js";
// import logger from "./utils/logger.js";

// const PORT = process.env.PORT || 5000;

// // Start the server first
// app.listen(PORT, () => {
//   logger.info(`Server is running on port ${PORT}`);

//   // Attempt to connect to the database
//   DatabaseConnection()
//     .then(() => {
//       logger.info("Database connected successfully.");
//     })
//     .catch((err) => {
//       logger.error("Database connection failed:", err);
//     });
// });
