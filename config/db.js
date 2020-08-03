module.exports = {
  secret: "admin",
  connectionString: process.env.CONNECTION_URI || "mongodb://127.0.0.1:27017/",
  port: process.env.PORT || 5200,
};
