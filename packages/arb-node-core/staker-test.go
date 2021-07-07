package main   
import (
	"fmt"
	"flag"
	"math/big"
	"path"
	
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/staker"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/cmdhelp"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/ethutils"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/ethbridge"
	ethcommon "github.com/ethereum/go-ethereum/common"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/monitor"

)

func main() {  
	client, err := ethutils.NewRPCEthClient("https://rpc.testnet.moonbeam.network")
	folder := "/home/myym/Desktop/Github/arbitrum/rollups/moonbase/validator1"
	validatorUtilsAddr := ethcommon.HexToAddress("0xeB2C817B3c74eC230CBEbB00aebbeddd5050D1fF")
	validatorAddress := ethcommon.HexToAddress("0x5fEf3e25c2c1c13A16CEb8b3F4199AbbA21b33D6")
	rollupAddr := ethcommon.HexToAddress("0xB791629fA3E4D0c7f9DEAd6Bcea26A9981c7aE3A")

	ctx, _, _ := cmdhelp.CreateLaunchContext()

	flagSet := flag.NewFlagSet("validator", flag.ExitOnError)
	walletFlags := cmdhelp.AddWalletFlags(flagSet)
	gasPriceUrl := flagSet.String("gas-price-url", "", "gas price rpc url (etherscan compatible)")


	var l1ChainId *big.Int
	for {
		l1ChainId, err = client.ChainID(ctx)
		if err == nil {
			break
		}
		fmt.Println(err)
		fmt.Println("Error getting chain ID")
	}

	auth, _, err := cmdhelp.GetKeystore(folder, walletFlags, flagSet, l1ChainId)
	fmt.Println("\nError:", err)
	fmt.Println(auth)


	dbPath := path.Join(folder, "arbStorage")
	arbosPath := path.Join(folder, "arbos.mexe")
	fmt.Println(dbPath)
	fmt.Println(arbosPath)

	mon, err := monitor.NewMonitor(dbPath, arbosPath)
	if err != nil {
		fmt.Println(err, "error opening monitor")
	}
	defer mon.Close()


	valAuth, err := ethbridge.NewTransactAuth(ctx, client, auth, *gasPriceUrl)
	if err != nil {
		fmt.Println(err, "error creating connecting to chain")
	}
	val, err := ethbridge.NewValidator(validatorAddress, rollupAddr, client, valAuth)
	if err != nil {
		fmt.Println(err, "error creating validator wallet")
	}
	// var strategy = staker.MakeNodesStrategy
	// stakerManager, _, err := staker.NewStaker(ctx, mon.Core, client, val, common.NewAddressFromEth(validatorUtilsAddr), strategy)

	fmt.Println(validatorUtilsAddr)
	fmt.Println(val)

}