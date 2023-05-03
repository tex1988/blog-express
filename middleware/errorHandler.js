function errorLogger(error, request, response, next) {
  console.log(error.stack);
  next(error);
}

function errorResponder(error, request, response, next) {
  response.header('Content-Type', 'application/json');
  const status = error.status || 500;
  let message;
  if (error.status === 500) {
    message = 'Internal server error';
  } else {
    message = error.message;
  }
  response.status(status).json({ status: status, message: message });
}

function invalidPathHandler(request, response, next) {
  response.status(404);
  response.json({ status: 404, message: 'Invalid path' });
}

module.exports = { errorLogger, errorResponder, invalidPathHandler };
