import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer, employee} = await getNamedAccounts();

  //Employee Fund vesting contract consists of a linear vest of 200,000 LODE tokens 
  //over the course of 1 year. 

  var duration = "47304000"; //18 months in seconds

  console.log("duration in seconds", duration);

  const durationYears = 47304000 / (3.154e7);
  console.log("duration in years", durationYears);


  //Start time is ~10 minutes following deployment to allow for time to send vesting tokens to contract
  function calculateStart(currentTime: Date): Date {
    const result = new Date(currentTime);
    result.setTime(result.getTime() + 300000);
    return result;
  }

  //Current time
  const currentTime = new Date();

  const date = calculateStart(currentTime);  

  const start = Math.floor(date.getTime() / 1000);

  const startReadable = new Date(start);

  console.log("Start Time is: ", start);

  console.log("Readable Start Time is: ", startReadable);

  console.log("Benefificary Address for Employee Fund is: ", employee);



  const Waffle = await deploy('Employee', {
    from: deployer,
    contract: 'VestingWalletLinear',
    args: [
        employee,
        start,
        duration,
    ],
    log: true
  });

};
export default func;
func.tags = ['Employee'];