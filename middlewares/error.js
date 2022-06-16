module.exports = (error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    res.status(401).send(error.message);
  }
  res.status(500).send("Something went wrong!");
};
