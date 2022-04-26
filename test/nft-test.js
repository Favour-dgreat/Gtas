const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GtasNFT", function () {
  this.timeout(50000);

  let gtasNFT;
  let owner;
  let acc1;
  let acc2;

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const GtasNFT = await ethers.getContractFactory("GtasNFT");
    [owner, acc1, acc2] = await ethers.getSigners();

    watchNFT = await GtasNFT.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await gtasNFT.owner()).to.equal(owner.address);
  });

  it("Should mint one NFT", async function () {
    expect(await gtasNFT.balanceOf(acc1.address)).to.equal(0);

    const tokenURI = "https://example.com/1";
    await gtasNFT.connect(owner).safeMint(acc1.address, tokenURI);
    await gtasNFT;

    expect(await gtasNFT.balanceOf(acc1.address)).to.equal(1);
  });

  it("Should set the correct tokenURI", async function () {
    const tokenURI_1 = "https://example.com/1";
    const tokenURI_2 = "https://example.com/2";

    const tx1 = await gtasNFT
      .connect(owner)
      .safeMint(acc1.address, tokenURI_1);
    await tx1.wait();
    const tx2 = await gtasNFT
      .connect(owner)
      .safeMint(acc2.address, tokenURI_2);
    await tx2.wait();

    expect(await watchNFT.tokenURI(0)).to.equal(tokenURI_1);
    expect(await watchNFT.tokenURI(1)).to.equal(tokenURI_2);
  });
  it("Should transfer the NFT", async function(){
    await gtasNFT
    .connect(owner)
    .safeMint(acc1.address, "https://example.com/1");
     await gtasNFT
    .connect(acc1)
    .makeTransfer(acc1.address, acc2.address, 0);
    await gtasNFT.connect(acc2).makeTransfer(acc2.address, owner.address,0)
  })
  it("Get owner count", async function(){
    await gtasNFT
    .connect(owner)
    .safeMint(acc1.address, "https://example.com/1");
     await gtasNFT
    .connect(acc1)
    .makeTransfer(acc1.address, acc2.address, 0);
    await gtasNFT.connect(acc2).makeTransfer(acc2.address, owner.address,0);
    const owners = await watchNFT.connect(acc1).getOwners();
    console.log(owners);
  })
});
