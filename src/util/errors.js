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


exports.NEXT_ACTION_NOT_FOUND = ()=>{
    throw createAppError({
        type: "App.InvalidFunctionCall",
        message: "There is no more actions to execute.",
        detail: "",
        extendedInfo: "",
        hint:"make sure not to call the ctx.next() at the last action."
    });
}