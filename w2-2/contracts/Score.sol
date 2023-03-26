// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// 简单版本的 教师记录分数合约
contract Score {
    mapping(address => bool) public Teachers;
    mapping(address => uint) public Scores;
    address public owner;
    // 最大精度小数点后两位
    uint public Decimals=2;
    uint public MaxScore = 100*(10**Decimals);
    uint public MiniScore = 0;

    constructor() {
        owner = msg.sender;

    }

    modifier OnlyTeacher {
        require(Teachers[msg.sender], "Only teacher");
        _;
    }


    modifier OnlyOwner() {
        require(owner == msg.sender, "Only owner");
        _;
    }

    function EditTeacher(address teacher, bool value) external OnlyOwner returns(address, bool) {
        Teachers[teacher] = value;
        return (teacher, value);
    }



    function EditScores(address student, uint value) external OnlyTeacher returns(address, uint) {
        value = value*10**Decimals;
        require(value<=MaxScore, "Score greater then MaxScore");
        require(value>=MiniScore, "Score less then MiniScore");
        require(Teachers[student]!=true, "You r teacher");
        Scores[student] = value;
        return (student, value);
    }



}