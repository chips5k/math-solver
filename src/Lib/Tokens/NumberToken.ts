import Token from './Token';
export default class NumberToken extends Token{
     constructor(private _value: number) {
        super();
    }; 

    public get value(): number {
        return this._value;
    }
}

