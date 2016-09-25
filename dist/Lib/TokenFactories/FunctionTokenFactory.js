"use strict";
class FunctionTokenFactory {
    constructor(classMap) {
        this.classMap = classMap;
    }
    ;
    create(value) {
        if (this.classMap.hasOwnProperty(value)) {
            return this.classMap[value]();
        }
        throw 'Type not supported';
    }
    compilePattern() {
        return Object.keys(this.classMap).join('|');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FunctionTokenFactory;
//# sourceMappingURL=FunctionTokenFactory.js.map