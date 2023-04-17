const fs = require("fs");
const { exec } = require("child_process");

// Define the different chains you want to deploy to
const chains = [
  "Cyprus",
  "Paxos",
  "Hydra",
  "Cyprus1",
  "Cyprus2",
  "Cyprus3",
  "Paxos1",
  "Paxos2",
  "Paxos3",
  "Hydra1",
  "Hydra2",
  "Hydra3",
];

// Path to your rpc.js file
const rpcFile = "./rpc.js";

// Function to update the rpc.js file with the new chain
function updateRpcFile(chain) {
  const rpcTemplate = `
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const accounts = [
  process.env.PRIMEPK,
  process.env.CYPRUSPK,
  process.env.PAXOSPK,
  process.env.HYDRAPK,
  process.env.CYPRUS1PK,
  process.env.CYPRUS2PK,
  process.env.CYPRUS3PK,
  process.env.PAXOS1PK,
  process.env.PAXOS2PK,
  process.env.PAXOS3PK,
  process.env.HYDRA1PK,
  process.env.HYDRA2PK,
  process.env.HYDRA3PK,
];

module.exports = {
  defaultChain: "${chain}",
  addressData: {
    adresses: accounts,
    addressIndex: {
      Prime: 0,
      Cyprus: 1,
      Paxos: 2,
      Hydra: 3,
      Cyprus1: 4,
      Cyprus2: 5,
      Cyprus3: 6,
      Paxos1: 7,
      Paxos2: 8,
      Paxos3: 9,
      Hydra1: 10,
      Hydra2: 11,
      Hydra3: 12,
    },
  },
  urlObject: {
    local: {
        Prime: "http://localhost:8546",
        Cyprus: "http://localhost:8578",
        Paxos: "http://localhost:8580",
        Hydra: "http://localhost:8582",
        Cyprus1: "http://localhost:8610",
        Cyprus2: "http://localhost:8542",
        Cyprus3: "http://localhost:8674",
        Paxos1: "http://localhost:8512",
        Paxos2: "http://localhost:8544",
        Paxos3: "http://localhost:8576",
        Hydra1: "http://localhost:8614",
        Hydra2: "http://localhost:8646",
        Hydra3: "http://localhost:8678",
      },
      garden: {
        Prime: "https://rpc.prime.garden.quaiscan.io/",
        Cyprus: "https://rpc.cyprus.garden.quaiscan.io/",
        Paxos: "https://rpc.paxos.garden.quaiscan.io/",
        Hydra: "https://rpc.hydra.garden.quaiscan.io/",
        Cyprus1: "https://rpc.cyprus1.garden.quaiscan.io/",
        Cyprus2: "https://rpc.cyprus2.garden.quaiscan.io/",
        Cyprus3: "https://rpc.cyprus3.garden.quaiscan.io/",
        Paxos1: "https://rpc.paxos1.garden.quaiscan.io/",
        Paxos2: "https://rpc.paxos2.garden.quaiscan.io/",
        Paxos3: "https://rpc.paxos3.garden.quaiscan.io/",
        Hydra1: "https://rpc.hydra1.garden.quaiscan.io/",
        Hydra2: "https://rpc.hydra2.garden.quaiscan.io/",
        Hydra3: "https://rpc.hydra3.garden.quaiscan.io/",
      },
      colosseum: {
        Prime: "https://rpc.prime.colosseum.quaiscan.io/",
        Cyprus: "https://rpc.cyprus.colosseum.quaiscan.io/",
        Paxos: "https://rpc.paxos.colosseum.quaiscan.io/",
        Hydra: "https://rpc.hydra.colosseum.quaiscan.io/",
        Cyprus1: "https://rpc.cyprus1.colosseum.quaiscan.io/",
        Cyprus2: "https://rpc.cyprus2.colosseum.quaiscan.io/",
        Cyprus3: "https://rpc.cyprus3.colosseum.quaiscan.io/",
        Paxos1: "https://rpc.paxos1.colosseum.quaiscan.io/",
        Paxos2: "https://rpc.paxos2.colosseum.quaiscan.io/",
        Paxos3: "https://rpc.paxos3.colosseum.quaiscan.io/",
        Hydra1: "https://rpc.hydra1.colosseum.quaiscan.io/",
        Hydra2: "https://rpc.hydra2.colosseum.quaiscan.io/",
        Hydra3: "https://rpc.hydra3.colosseum.quaiscan.io/",
      },
  },
};
  `;

  fs.writeFileSync(rpcFile, rpcTemplate);
}

// Function to deploy using your deploy.js script
function deployContract() {
  return new Promise((resolve, reject) => {
    exec("node scripts/deploy.js", (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(`${stdout}`);
      resolve();
    });
  });
}

(async () => {
  for (const chain of chains) {
    console.log("=====================================");
    console.log(`Deploying to chain: ${chain}`);
    updateRpcFile(chain);
    await deployContract();
  }
})();
