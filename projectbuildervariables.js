const BoilerplateBuilder = require('./boilerplatebuilder.js').BoilerplateBuilder;

// Export variable keys and resolver functions
const VariableKeys = {
  ELEMENT_NAME_CAMEL: 0,
  ELEMENT_NAME_CAMEL_CAP: 1,
};
exports.VariableKeys = VariableKeys;

// The resolver functions for each variable key
exports.ResolverMap = {
  [VariableKeys.ELEMENT_NAME_CAMEL]: BoilerplateBuilder.toCamelCase,
  [VariableKeys.ELEMENT_NAME_CAMEL_CAP]: BoilerplateBuilder.toCamelCase.bind(null, null, true),
};
