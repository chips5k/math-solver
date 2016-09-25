import Lexer from './Lib/Lexer';

//Token factories
import OperatorTokenFactory from './Lib/TokenFactories/OperatorTokenFactory';
import FunctionTokenFactory from './Lib/TokenFactories/FunctionTokenFactory';
import ConstantTokenFactory from './Lib/TokenFactories/ConstantTokenFactory';
import VariableTokenFactory from './Lib/TokenFactories/VariableTokenFactory';
import NumberTokenFactory from './Lib/TokenFactories/NumberTokenFactory';

//Custom Function Token Definitions
import SineToken from './Lib/Tokens/FunctionTokens/SineToken';
import CosineToken from './Lib/Tokens/FunctionTokens/CosineToken';
import TangentToken from './Lib/Tokens/FunctionTokens/TangentToken';

//Custom Constant Token Definitions
import PiToken from './Lib/Tokens/ConstantTokens/PiToken';


//Note, NumberTokenFactory needs to be the first item to ensure unary values are correctly caught
var factories = [
    new NumberTokenFactory(),
    new FunctionTokenFactory({
        sin: () => { return new SineToken(); },
        cos: () => { return new CosineToken(); },
        tan: () => { return new TangentToken(); }
    }),
    new ConstantTokenFactory({
        PI: () => { return new PiToken(); }
    }),
    new OperatorTokenFactory(),
    new VariableTokenFactory()
]



var lexer = new Lexer();

for(let i in factories) {
    lexer.registerFactory(factories[i]);
}


var tokens = lexer.tokenize('1 + 2 / x');
console.log(tokens);
