import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer, admin} = await getNamedAccounts();

  const quanta = process.env.QUANTA;
  const beneficiary = quanta?.toString();

  //testing cliff vesting contract

  var duration = "300"; //5 minute total vest time for test

  console.log("duration in seconds", duration);

  const durationYears = 300 / (3.154e7);
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

  console.log("UNIX Start Time is:", start);

  console.log("Readable Start Time is:", startReadable);

  console.log(admin);



  const Waffle = await deploy('Test', {
    from: deployer,
    contract: 'VestingWalletCliffTest',
    args: [
        beneficiary,
        start,
        duration,
    ],
    log: true
  });

};
export default func;
func.tags = ['Test'];