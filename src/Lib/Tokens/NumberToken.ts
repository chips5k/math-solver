import Token from './Token';

export default class NumberToken extends Token {
    private _value: number;

    constructor(value: number | string) {
        super();
        this._value = typeof value === 'string' ? parseFloat(value) : value;
    }

    get value(): number {
        return this._value;
    }

    toString(): string {
        return String(this._value);
    }
}
