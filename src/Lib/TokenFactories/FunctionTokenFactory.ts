import TokenFactory from './TokenFactory';
import FunctionToken from '../Tokens/FunctionToken';

export default class FunctionTokenFactory implements TokenFactory  {
    constructor(private classMap: {[key: string]: () => FunctionToken}) {};
    
    create(value: string): FunctionToken {
        if(this.classMap.hasOwnProperty(value)) {
            return this.classMap[value]();
        }

        throw 'Type not supported';
    }

    compilePattern(): string {
        return Object.keys(this.classMap).join('|');
    }
}