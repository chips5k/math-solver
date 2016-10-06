import Token from './Token';
export default class NumberToken extends Token{
    type: 'number';
    constructor(private value: number) {
        super();
    };
}

