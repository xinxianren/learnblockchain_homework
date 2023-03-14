# learnblockchain_homework

# w1-1
写一份counter合约


# w1-2
1、合约部署在 goerli 测试网
2、合约地址：0xF671fCCC5E3E62a5B22da2B56bB1CB7f4325D07c
3、实现onlyOwner功能
4、实现其他地址无法调用
5、合约测试能力有待提高
6、已通过hardhat验证冰开源合约


注：vscode中用hardhat提交验证需要设置代理
require('dotenv').config()
const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:port")
setGlobalDispatcher(proxyAgent)

