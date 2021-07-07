package main  
 
import (
	"fmt"
	"math/big"
	"flag"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/ethbridgecontracts"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/ethutils"
	"github.com/offchainlabs/arbitrum/packages/arb-node-core/cmdhelp"
	ethcommon "github.com/ethereum/go-ethereum/common"
	"github.com/pkg/errors"
	"github.com/rs/zerolog"
)
var logger zerolog.Logger

func main() {  
	client, err := ethutils.NewRPCEthClient("https://rpc.testnet.moonbeam.network")
	validatorWalletFactoryAddr := ethcommon.HexToAddress("0xe4F6278E2554E29A187BDABeBe8D46335Df5dC2a")

	if err != nil {
		fmt.Println(err, "error loading wallet keystore")
	}

	ctx, _, _ := cmdhelp.CreateLaunchContext()

	if err != nil {
		fmt.Println(errors.Wrap(err, "error creating Ethereum RPC client"))
	}

	var l1ChainId *big.Int
	for {
		l1ChainId, err = client.ChainID(ctx)
		if err == nil {
			break
		}
		fmt.Println(err)
		fmt.Println("Error getting chain ID")
	}
	logger.Debug().Str("chainid", l1ChainId.String()).Msg("connected to l1 chain")

	folder := "/home/myym/Desktop/Github/arbitrum/rollups/moonbase/validator1"
	flagSet := flag.NewFlagSet("validator", flag.ExitOnError)
	walletFlags := cmdhelp.AddWalletFlags(flagSet)

	auth, _, err := cmdhelp.GetKeystore(folder, walletFlags, flagSet, l1ChainId)
	fmt.Println("\nError:", err)
	fmt.Println(auth)


	walletCreator, err := ethbridgecontracts.NewValidatorWalletCreator(validatorWalletFactoryAddr, client)
	
	fmt.Println("Error:", err)
	fmt.Println(walletCreator)


	auth.GasLimit = 2000000
	tx, err := walletCreator.CreateWallet(auth)
	fmt.Println("Error:", err)
	fmt.Println(tx)

}
