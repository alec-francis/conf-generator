// Custom error containing a status code to return to a client
class HttpError extends Error {
  constructor({ message, status, details }) {
    super(message)

    // Assign the error name as HttpError
    this.name = this.constructor.name

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor)

    // Save the HTTP error code to return to the client
    this.status = status

    // Save the details object if it was provided
    if (details) this.details = details
  }
}

module.exports = HttpError
