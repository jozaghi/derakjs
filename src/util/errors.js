const util = require("util");

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


const type={
  "INVALID_FUNCTION_CALL":"App.InvalidFunctionCall",
  "INVALID_TYPE":"App.InvalidType",
  "INVALID_FORMAT":"App.InvalidFormat"
}

exports.NEXT_ACTION_NOT_FOUND = ()=>{
    throw createAppError({
        type: type.INVALID_FUNCTION_CALL,
        message: "There is no more actions to execute.",
        detail: "",
        extendedInfo: "",
        hint:"make sure not to call the ctx.next() at the last action."
    });
}

exports.REQUEST_CONTENT_TYPE_IS_NOT_SUPPORTED = ()=>{
  throw createAppError({
      type: type.INVALID_TYPE,
      message: "content-type header is not supported",
      detail: "",
      extendedInfo: "",
      hint:"please user one from ['text/plain','application/json']"
  });
}

exports.REQUEST_HAS_INVALID_JSON_BODY = ()=>{
  throw createAppError({
      type: type.INVALID_FORMAT,
      message: "Request body is not a valid json.",
      detail: "",
      extendedInfo: "",
      hint:"user an online json validator to find the issue"
  });
}