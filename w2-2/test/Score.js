const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  describe("Score", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployScore() {
      // Contracts are deployed using the first signer/account by default
      const [owner, teacher1, teacher2,teacher3] = await ethers.getSigners();
  
      const Score = await ethers.getContractFactory("Score");
      const score = await Score.deploy();
 
      return { score, owner, teacher1, teacher2, teacher3 };
    }
  
    describe("Deployment", function () {
      it("合约创建者等于owner", async function () {
        const { score, owner } = await loadFixture(deployScore);
        expect(await score.owner()).to.equal(owner.address);
      });
  
      it("检查编辑教师信息", async function () {
        const { score, owner, teacher1, teacher2, teacher3  } = await loadFixture(deployScore);
  
        await score.EditTeacher(teacher1.address, true);
        await score.EditTeacher(teacher2.address, true);
        await score.EditTeacher(teacher3.address, false);
        expect(await score.Teachers(teacher1.address)).to.equal(
          true
        );
        expect(await score.Teachers(teacher2.address)).to.equal(
          true
        );
        expect(await score.Teachers(teacher3.address)).to.equal(
          false
        );
      });
  
      it("检查其他用户可否编辑教师信息", async function () {
        const { score, owner, teacher1, teacher2, teacher3 } = await loadFixture(
          deployScore
        );
  
        expect(await score.connect(teacher1).EditTeacher(teacher2.address, true)).to.be.revertedWith(
                "Only owner"
              );
        expect(await score.connect(owner).EditTeacher(teacher3.address, true));
    });
  
    //   it("Should fail if the unlockTime is not in the future", async function () {
    //     // We don't use the fixture here because we want a different deployment
    //     const latestTime = await time.latest();
    //     const Lock = await ethers.getContractFactory("Lock");
    //     await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //       "Unlock time should be in the future"
    //     );
    //   });
    });
  
    // describe("Withdrawals", function () {
    //   describe("Validations", function () {
    //     it("Should revert with the right error if called too soon", async function () {
    //       const { lock } = await loadFixture(deployOneYearLockFixture);
  
    //       await expect(lock.withdraw()).to.be.revertedWith(
    //         "You can't withdraw yet"
    //       );
    //     });
  
    //     it("Should revert with the right error if called from another account", async function () {
    //       const { lock, unlockTime, otherAccount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       // We can increase the time in Hardhat Network
    //       await time.increaseTo(unlockTime);
  
    //       // We use lock.connect() to send a transaction from another account
    //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
    //         "You aren't the owner"
    //       );
    //     });
  
    //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
    //       const { lock, unlockTime } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       // Transactions are sent using the first signer by default
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw()).not.to.be.reverted;
    //     });
    //   });
  
    //   describe("Events", function () {
    //     it("Should emit an event on withdrawals", async function () {
    //       const { lock, unlockTime, lockedAmount } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw())
    //         .to.emit(lock, "Withdrawal")
    //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
    //     });
    //   });
  
    //   describe("Transfers", function () {
    //     it("Should transfer the funds to the owner", async function () {
    //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
    //         deployOneYearLockFixture
    //       );
  
    //       await time.increaseTo(unlockTime);
  
    //       await expect(lock.withdraw()).to.changeEtherBalances(
    //         [owner, lock],
    //         [lockedAmount, -lockedAmount]
    //       );
    //     });
    //   });
    // });
  });
  