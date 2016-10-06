import Token from './Token';
export default class VariableToken extends Token {
    type: 'variable';
    constructor(private value: string) {
        super();
    }; 
}