/**
 * The service error type module
 * @module
 */

"use strict";

/**
 * Represents a service error.
 * @class
 */
class ApiError {

  /**
   * @constructor
   * @param {string} errorType The type of the error. Currently either "ValidationError" or "Error".
   * @param {Array<string>} message Collection of error message.
   * @param {Error} innerError The original native JavaScript error.
   * @param {Number} statusCode the Http status code for JavaScript error.
   */
  constructor(errorType, message, innerError, statusCode) {

    /** @member {string} errorType The type of the error. Currently either "ValidationError" or "Error". */
    this.errorType = errorType;

    /** @member {string} messages error message. */
    this.message = message;

    /** @member {Error} innerError The original native JavaScript error. */
    this.innerError = innerError;

    this.statusCode = statusCode;
  }
}

module.exports = ApiError;