const define = require('../boilerplatebuilder.js').BoilerplateBuilder.define;
const VariableKeys = require('../projectbuildervariables.js').VariableKeys;

/**
 * The BUILD file's content template.
 */
exports.content = define`
README TEST
        "${VariableKeys.ELEMENT_NAME_CAMEL}",

`;


/**
 * The file name's string template.
 */
exports.name = define`readme.text`;
