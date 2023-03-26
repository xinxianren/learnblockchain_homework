const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { ethers } = require("hardhat");
  
  describe("Bank", function () {
    async function deployBankContract() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      init_amount = 1000;
  
      const Bank = await ethers.getContractFactory("Bank");
      const bank = await Bank.deploy({value:init_amount});
  
      return { bank, owner, otherAccount, init_amount};
    }
  
    describe("Deployment", function () {
  
      it("查看合约创建者是否正确", async function () {
        const { bank, owner } = await loadFixture(deployBankContract);
  
        expect(await bank.owner()).to.equal(owner.address);
        // 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
      });
  
      it("检查构造函数存入的金额", async function () {
        const { bank, init_amount } = await loadFixture(
            deployBankContract
        );
  
        expect(await bank.depositers(bank.owner())).to.equal(
            init_amount
        );
      });
  
      it("检查可否存入金额", async function () {
        const { bank, owner, otherAccount } = await loadFixture(
            deployBankContract
        );

        await bank.connect(otherAccount).deposit({ value: 11 });
        expect(await bank.connect(otherAccount).depositers(otherAccount.address)).to.equal(
            11
        );
        
        expect(await bank.connect(owner).depositers(owner.address)).to.equal(
            1000
        );
      });
      });
  
    describe("Withdrawal", function () {
      describe("Validations", function () {
        it("如果想提取大于用户余额的数量，将会拒绝", async function () {
          const { bank ,owner, otherAccount} = await loadFixture(deployBankContract);
          await expect(bank.connect(otherAccount).withdraw(1)).to.be.revertedWith(
            "Balance not enough"
          );
        });
      });


    });
  });
  