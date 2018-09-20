const defaultMessages = {
    req: "{name} is required.",
    min: "{name} must be at least {min} chars.",
    max: "{name} must be at most {max} chars.",
    match: "{name} dose not follow the required format.",
    email: "{name} is not a currect email address",
    alpha: "{name} must only contains alphabets.",
    alphaNum: "{name} must only contains alphabets and numbers ."
  };
  
  const getMessage = (key, message, args) => {
    if (message === null) {
      message = defaultMessages[key];
      for (let item in args) {
        message = message.replace(`{${item}}`, args[item]);
      }
    }
    return message;
  };
  
  var validator = function() {
    var rules = [];
  
    const fail = error => {
      return {
        isValid: false,
        errors: { ...error }
      };
    };
    const success = error => {
      return {
        isValid: true
      };
    };
    const testRegex = (pattern, val) => {
      var regex = new RegExp(pattern);
      return regex.test(val);
    };
  
    this.req = (message = null) => {
      rules.push((name, val) => {
        message = getMessage("req", message, { name });
        if (val === undefined || val === null || val === "")
          return fail({ [name]: message });
        return true;
      });
      return this;
    };
    this.min = (num, message = null) => {
      rules.push((name, val) => {
        message = getMessage("min", message, { name: name, min: num });
        if (typeof val !== "string" || String(val).length < num)
          return fail({ [name]: message });
        return true;
      });
      return this;
    };
    this.max = (num, message = null) => {
      rules.push((name, val) => {
        message = getMessage("max", message, { name: name, max: num });
        if (typeof val !== "string" || String(val).length > num)
          return fail({ [name]: message });
        return true;
      });
      return this;
    };
    this.match = (pattern, message = null) => {
      rules.push((name, val) => {
        message = getMessage("match", message, { name });
        if (!testRegex(pattern, val)) {
          return fail({ [name]: message });
        }
        return true;
      });
      return this;
    };
    this.email = (message = null) => {
      rules.push((name, val) => {
        message = getMessage("email", message, { name });
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!testRegex(emailPattern, val)) {
          return fail({ [name]: message });
        }
        return true;
      });
      return this;
    };
    this.alpha = (message = null) => {
      rules.push((name, val) => {
        message = getMessage("alpha", message, { name });
        let alphaPattern = /^[a-zA-Z]*$/;
        if (!testRegex(alphaPattern, val)) {
          return fail({ [name]: message });
        }
        return true;
      });
      return this;
    };
    this.alphaNum = (message = null) => {
      rules.push((name, val) => {
        message = getMessage("alphaNum", message, { name });
        let alphaNumPattern = /^[a-zA-Z0-9]*$/;
        if (!testRegex(alphaNumPattern, val)) {
          return fail({ [name]: message });
        }
        return true;
      });
      return this;
    };
    this.run = (name, data) => {
      for (let i = 0; i < rules.length; i++) {
        var result = rules[i].call(null, name, data);
        if (result !== true) return result;
      }
      return success();
    };
  
    return this;
  };
  var v = new validator();
  
  console.log(
    v
      .req()
      .min(3)
      .max(20)
      .email()
      .match(/^.+$/)
      .run("name", "a@b.com")
  );
  