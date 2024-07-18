import express from "express";
// 'app' variable holds the functionality of the express application
const app = express();
// Creating routes and middlewares.
app.get("/hello", (req, res, next) => {
    return res.send("Hello");
});
// To open the development server of the application.
app.listen(5000, () => console.log("Server Open"));
//# sourceMappingURL=index.js.map