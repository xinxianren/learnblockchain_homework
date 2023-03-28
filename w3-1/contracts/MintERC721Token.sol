// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract BoneSoup is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    string private name_ = "nft";
    string private symbol_ = "nft";

    // 构造函数
    constructor() ERC721(name_, symbol_){
    }

    
    // 铸造函数
    function mint(address to, string calldata TokenURI) external returns(uint256) {
        uint256 tokenId = _tokenIDs.current();
        _mint(to, tokenId);
        _setTokenURI(tokenId, TokenURI);

        _tokenIDs.increment();
        return tokenId;
    }

}