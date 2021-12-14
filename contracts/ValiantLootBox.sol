// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";
import "./Valiant.sol";
import "./IFactoryERC721.sol";

/**
 * @title ValiantLootBox
 *
 * ValiantLootBox - a tradeable loot box of Valiants.
 */
contract ValiantLootBox is ERC721Tradable {
    uint256 NUM_VALIANTS_PER_BOX = 3;
    uint256 OPTION_ID = 0;
    address factoryAddress;

    constructor(address _proxyRegistryAddress, address _factoryAddress)
        ERC721Tradable("ValiantLootBox", "LOOTBOX", _proxyRegistryAddress)
    {
        factoryAddress = _factoryAddress;
    }

    function unpack(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == _msgSender());

        // Insert custom logic for configuring the item here.
        for (uint256 i = 0; i < NUM_VALIANTS_PER_BOX; i++) {
            // Mint the ERC721 item(s).
            FactoryERC721 factory = FactoryERC721(factoryAddress);
            factory.mint(OPTION_ID, _msgSender());
        }

        // Burn the presale item.
        _burn(_tokenId);
    }

    function baseTokenURI() override public pure returns (string memory) {
        return "https://valiants-api.opensea.io/api/box/";
    }

    function itemsPerLootbox() public view returns (uint256) {
        return NUM_VALIANTS_PER_BOX;
    }
}