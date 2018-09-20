const extractRegex = param => {
    if (!/^:\w+\(.+\)\/?$/.test(param)) return null;
    return param.replace(/^:\w+\(/gi, "").replace(/\)\/?$/, "");
};
const getParametersName = param => {
    return param.replace(/^:/, "").replace(/\(.+$/, "");
};
const getParameters = path => {
    const regex = /(?::(\w+(\([^\/]+\))?))/gm;
    let match = null;
    let paramiters = [];
    while ((match = regex.exec(path)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        var pattern = extractRegex(match[0]);
        if (match.length > 0)
            paramiters.push({
                name: getParametersName(match[0]),
                path: match[0],
                hasPattern: pattern != null,
                pattern
            });
    }
    return paramiters;
};

const build= path => {
    let parameters = getParameters(path);
    let parameterList = [];
    console.log(parameters);
    parameters.map((param, index) => {
        if (param.hasPattern) {
            path = path.replace(param.path, "(?:(" + param.pattern + "))");
        } else {
            path = path.replace(param.path, "(?:([^/]+))");
        }
        parameterList.push(param.name);
    });
    path = "^" + path + "/?$";
    return { pattern: path, parameterList };
};

const match = (route, routePattern) => {
    let regex = new RegExp(routePattern.pattern, "i");
    let match = null;
    let parameters = {};
    var isMatch = false;
    if ((match = regex.exec(route)) !== null) {
        isMatch = true;
        routePattern.parameterList.map((item, index) => {
            parameters[item] = match[index + 1];
        });
    }
    return {
        parameters,
        isMatch
    };
};

module.exports = {
    build,
    match
}
