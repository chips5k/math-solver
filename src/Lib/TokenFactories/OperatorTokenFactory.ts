import TokenFactory from './TokenFactory';
import OperatorToken from '../Tokens/OperatorToken';

//Operator Token Definitions
import AdditionToken from '../Tokens/OperatorTokens/AdditionToken';
import SubtractionToken from '../Tokens/OperatorTokens/SubtractionToken';
import DivisionToken from '../Tokens/OperatorTokens/DivisionToken';
import MultiplicationToken from '../Tokens/OperatorTokens/MultiplicationToken';
import PowerToken from '../Tokens/OperatorTokens/PowerToken';
import EqualityToken from '../Tokens/OperatorTokens/EqualityToken';
import LeftParenToken from '../Tokens/OperatorTokens/LeftParenToken';
import RightParenToken from '../Tokens/OperatorTokens/RightParenToken';
import SeparatorToken from '../Tokens/OperatorTokens/SeparatorToken';

export default class OperatorTokenFactory implements TokenFactory {
    private classMap: {[key: string]: () => OperatorToken };

    constructor(classMap?: {[key: string]: () => OperatorToken }) {

        this.classMap = {
            '+': () => { return new AdditionToken(); },
            '-': () => { return new SubtractionToken(); },
            '/': () => { return new DivisionToken(); },
            '*': () => { return new MultiplicationToken(); },
            '^': () => { return new PowerToken(); },
            '=': () => { return new EqualityToken(); },
            ',': () => { return new SeparatorToken(); },
            '(': () => { return new LeftParenToken(); },
            ')': () => { return new RightParenToken(); }
        };   

        if(classMap) {
            Object.assign(this.classMap, classMap);
        }    

    };
    
    create(value: string): OperatorToken {
        if(this.classMap.hasOwnProperty(value)) {
            return this.classMap[value]();
        }

        throw 'Type not supported';
    }

    compilePattern(): string {
       
        return '[' +Object.keys(this.classMap).join('') + ']';
        
    }
} 