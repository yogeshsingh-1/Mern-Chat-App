import app from "./server.js";

const port = process.env.PORT ?? 5000;

// Global Error Handler
app.use((err, req, res, next) => {
  return res.status(err.status ?? 500).json({
    status: false,
    message: err.message || "Something went wrong",
  });
});
app.listen(port, () => console.log(`server is listening on port ${port}`));
