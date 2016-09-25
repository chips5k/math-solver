import ConstantToken from '../ConstantToken';

export default class PiToken extends ConstantToken {
    get value(): number {
        return Math.PI;
    }
    toString(): string {
        return 'PI';
    }
}
