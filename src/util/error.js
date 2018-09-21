var util = require("util");

const createAppError = function(settings) {
  return new AppError(settings, createAppError);
};

const AppError = function(settings, implementationContext) {
  settings = settings || {};
  this.name = "Error";
  this.type = settings.type || "Application";
  this.message = settings.message || "An error occurred.";
  this.detail = settings.detail || "";
  this.extendedInfo = settings.extendedInfo || "";
  this.link = settings.link || "";
  this.hint = settings.hint || "";
  this.isAppError = true;
  Error.captureStackTrace(this, implementationContext || AppError);
  util.inherits(AppError, Error);
};

module.exports = {
  AppError,
  createAppError
};
