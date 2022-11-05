import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer, admin} = await getNamedAccounts();

  var duration = "31536000";

  console.log("duration in seconds", duration);

  const durationYears = 31536000 / (3.154e7);
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

  console.log(startReadable);

  console.log(admin);



  const Waffle = await deploy('Waffle', {
    from: deployer,
    contract: 'VestingWalletLinear',
    args: [
        admin,
        start,
        duration,
    ],
    log: true
  });

};
export default func;
func.tags = ['Waffle'];