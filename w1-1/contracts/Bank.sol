// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) return 0;

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}


contract Bank {
    using SafeMath for uint256;
    mapping(address => uint256) public depositers;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        payable(address(this)).transfer(msg.value);
        depositers[msg.sender] = msg.value;
    }
    
    function deposit() public payable returns(uint) {
        require(msg.value>0, "Deposit must big then zero");
        depositers[msg.sender] += msg.value;
        return msg.value;
    }

    function withdraw(uint num) public returns(uint) {
        require(depositers[msg.sender]>0, "Balance not enough");
        require(depositers[msg.sender]>=num, "Balance not enough");
        depositers[msg.sender] -= num;
        payable(msg.sender).transfer(num);
        return depositers[msg.sender];
    }



}