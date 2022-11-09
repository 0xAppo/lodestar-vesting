import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer, admin} = await getNamedAccounts();

  //Waffle's vesting contract consists of a linear vest of 200,000 LODE tokens 
  //over the course of 1 year. 

  var duration = "3600";

  console.log("duration in seconds", duration);

  const durationYears = 3600 / (3.154e7);
  console.log("duration in years", durationYears);

  function calculateStart(currentTime: Date): Date {
    const result = new Date(currentTime);
    result.setTime(result.getTime() + 300000);
    return result;
  }

  const currentTime = new Date();

  const date = calculateStart(currentTime);  

  const start = Math.floor(date.getTime() / 1000);

  const startReadable = new Date(start);

  console.log(start);

  console.log(admin);



  const Waffle = await deploy('Test', {
    from: deployer,
    contract: 'VestingWalletCliffTest',
    args: [
        admin,
        start,
        duration,
    ],
    log: true
  });

};
export default func;
func.tags = ['Test'];