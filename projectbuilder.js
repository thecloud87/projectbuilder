const BoilerplateBuilder = require('./boilerplatebuilder.js').BoilerplateBuilder;
const ResolverMap = require('./projectbuildervariables.js').ResolverMap;


// A class to create project files from templates
// Extends BoilerplateBuilder
exports.ProjectBuilder = class extends BoilerplateBuilder {
  // Override abstract method
  resolveVariable(varType) {
    const resolver = ResolverMap[varType];
    if (resolver) {
      return resolver(this.getName());
    }
    return this.getName();
  }
  
}
