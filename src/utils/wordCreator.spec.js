import {expect} from 'chai';
import {getKeyFromWord} from './wordCreator';

describe('getKeyFromWord()', function () {
    it('should get key from word', function () {
        const key = getKeyFromWord("title");
        expect(key).to.be.equal(84853);
    });
});