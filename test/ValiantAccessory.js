/* Contracts in this test */

const ValiantAccessory = artifacts.require(
  "../contracts/ValiantAccessory.sol"
);


contract("ValiantAccessory", (accounts) => {
  const URI_BASE = 'https://valiants-api.opensea.io';
  const CONTRACT_URI = `${URI_BASE}/contract/opensea-erc1155`;
  let valiantAccessory;

  before(async () => {
    valiantAccessory = await ValiantAccessory.deployed();
  });

  // This is all we test for now

  // This also tests contractURI()

  describe('#constructor()', () => {
    it('should set the contractURI to the supplied value', async () => {
      assert.equal(await valiantAccessory.contractURI(), CONTRACT_URI);
    });
  });
});
