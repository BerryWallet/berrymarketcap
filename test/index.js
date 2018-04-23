const assert = require('assert');
const createClient = require('../dest').default;

const client = createClient();

describe('Test client', () => {
    it('Method getTicker', () => {

        const tickerId = 'bitcoin';

        return client
            .getTicker(tickerId)
            .then((tickerData) => {
                assert.equal(tickerId, tickerData.id);
            })
            .catch((error) => {
                throw error
            });
    });

    it('Method getTickers', () => {
        return client
            .getTickers({limit: 10})
            .then((tickersData) => {
                assert.equal(Array.isArray(tickersData), true);
                assert.equal(tickersData.length, 10);
            })
            .catch((error) => {
                throw error
            });
    });
});