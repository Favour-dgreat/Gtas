import React from "react";
import Cover from "./components/Cover";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/wallet";
import { useBalance, useMinterContract } from "./hooks";

import Nfts from "./components/minter/nfts";
import { useContractKit } from "@celo-tools/use-contractkit";

// import coverImg from "./assets/img/nft_geo_cover.png";
import "./App.css";

import { Container, Nav } from "react-bootstrap";

const App = function AppWrapper() {
  /*
    address : fetch the connected wallet address
    destroy: terminate connection to user wallet
    connect : connect to the celo blockchain
     */
  const { address, destroy, connect } = useContractKit();

  //  fetch user's celo balance using hook
  const { balance, getBalance } = useBalance();

  // initialize the NFT mint contract
  const minterContract = useMinterContract();

  return (
    <>
      <Notification />

      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          <main>
            {/*list NFTs*/}
            <Nfts className="bg-dark text-light"
              name="Give them a SMILE Collection"
              updateBalance={getBalance}
              minterContract={minterContract}
            />
          </main>
        </Container>
      ) : (
        //  if user wallet is not connected display cover page
        <Cover name="Give them a SMILE Collection" coverDescription ="This project is with the idea to donate to indigent kids through an NFT Collection" backgroundImg={"https://i.ibb.co/QKYXJFG/smile.png"} coverImg={"https://i.ibb.co/QKYXJFG/smile.png"} connect={connect} />
      )}
    </>
  );
};

export default App;
