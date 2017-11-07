// Contains a JS class for building element templates.

// Abstract class that generates a set of boilerplate files
exports.BoilerplateBuilder = class {
  
  constructor(name) {
    this.name_ = name;
  }
  
  getName() {
    return this.name_;
  }
  
  getFiles(templates) {
    return templates.map(function({name, content}) {
      return {
        fileName: this.templateDecorator_(name.strings, name.keys),
        fileContent: this.templateDecorator_(content.strings, content.keys),
      };
    }, this);
  }
  
  // Tagged function for interpolating template string literals
  templateDecorator_(strings, varKeys) {
    let result = '';
    for (let i = 0; i < varKeys.length; i++) {
      result += strings[i];
      result += this.resolveVariable(varKeys[i]);
    }
    // Add the last literal
    result += strings[strings.length -1];
    return result;
  }
  
  resolveVariable(varKey) {
    // To be subclassed
    return '';
  }
  
  // Helper method to convert a string with hyphens to a camel-cased string
  static toCamelCase(str, cap=false, separator='-') {
    const strSplit = str.toLowerCase().split(separator);
    const toCase = (t, i) => (cap || i > 0) ? t[0].toUpperCase() + t.slice(1) : t;
    return strSplit.map((token, i) => toCase(token, i)).join(''); 
  }
  
  // Static method to create the processed template
  static define(strings, ...keys) {
    return {strings, keys};
  }
};

////////////////////////////////////////////////////////////////////////////


