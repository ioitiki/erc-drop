// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Valiant
 * Valiant - a contract for my non-fungible valiants.
 */
contract Valiant is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Valiant8", "BLT", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "ipfs://QmWjaFNpZx2PbQJieci9mXhRcQCNgWhXFqdXw8Qkrysg3S/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://valiants-api.opensea.io/contract/opensea-valiants";
    }
}
