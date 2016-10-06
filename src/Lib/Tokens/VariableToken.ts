import Token from './Token';
export default class VariableToken extends Token {
    constructor(private _value: string) {
        super();
    }; 

    public get value(): string {
        return this._value;
    }

}