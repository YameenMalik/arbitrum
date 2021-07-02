sudo apt-get update
sudo apt install -y curl python3 python3-pip

touch ~/.bashrc
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash
. ~/.bashrc
nvm install 10.16.3

curl -o- -L https://yarnpkg.com/install.sh | bash
. ~/.bashrc

yarn global add truffle


sudo apt install -y docker.io
sudo groupadd docker
sudo usermod -aG docker ${USER}
su -s ${USER} # need amman's input on this

sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


git clone -b dev https://github.com/YameenMalik/arbitrum.git
cd arbitrum
git submodule update --init --recursive
yarn

yarn deploy:eth_bridge
yarn rollup:initialize

screen
yarn rollup:deploy:rinkeby
yarn rollup:deploy:rinkeby --up

ctrl + a + d # get out of screen

yarn enable:fee

cd pacakges/arb-bridge-eth
npx hardhat deposit 0x3ff177D812534deE562738841DD1CdcE38c86F2C 7540d48032c731b3a17947b63a04763492d84aef854246d355a703adc9b54ce9 0x931d6514C8d5522C7489aad7aCCFfC20E6A92E57 1000000000000000000 



