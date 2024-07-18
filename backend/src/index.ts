import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;
// connections and listeners
connectToDatabase().then(() => {
  app.listen(PORT, () => console.log("Server Open and connected to the Database")); 
  // To open the development server of the application.
}) .catch((err) => console.log(err));