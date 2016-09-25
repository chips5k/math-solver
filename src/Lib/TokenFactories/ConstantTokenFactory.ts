import TokenFactory from './TokenFactory';
import ConstantToken from '../Tokens/ConstantTokens/ConstantToken';

export default class ConstantTokenFactory implements TokenFactory  {
    constructor(private classMap: {[key: string]: () => ConstantToken }) {};
    
    create(value: string): ConstantToken {
        if(this.classMap.hasOwnProperty(value)) {
            return this.classMap[value]();
        }

        throw 'Type not supported';
    }

    compilePattern(): string {
        return Object.keys(this.classMap).join('|');
    }
}