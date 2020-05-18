const AavePool = artifacts.require("AavePool");

module.exports = function(deployer) {
  deployer.deploy(AavePool);
};
