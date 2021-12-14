// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Tradable.sol";

/**
 * @title ValiantAccessory
 * ValiantAccessory - a contract for Valiant Accessory semi-fungible tokens.
 */
contract ValiantAccessory is ERC1155Tradable {
    constructor(address _proxyRegistryAddress)
        ERC1155Tradable(
            "OpenSea Valiant Accessory",
            "OSCA",
            "https://valiants-api.opensea.io/api/accessory/{id}",
            _proxyRegistryAddress
        ) {}

    function contractURI() public pure returns (string memory) {
        return "https://valiants-api.opensea.io/contract/opensea-erc1155";
    }
}
