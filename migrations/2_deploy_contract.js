const ZombyFactory = artifacts.require("ZombyFactory");

module.exports = function (deployer) {
  deployer.deploy(ZombyFactory);
};
