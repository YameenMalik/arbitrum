mkdir -p ./ganache-db &&
ganache-cli -q -g 20000000000 -l 20000000000 -e 1000000 -m "dtrade order book test contracts dtrade order book test dtrade order book test" -p 7545 --chainId 44010 -h 0.0.0.0 --db=./ganache-db
