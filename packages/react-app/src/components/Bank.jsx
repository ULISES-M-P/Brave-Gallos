import React, { useState } from "react";
import { ethers } from "ethers";
import { DownloadOutlined, PoweroffOutlined, DollarCircleTwoTone, ReadOutlined } from "@ant-design/icons";
import { Button, Input, Radio } from "antd";
import logo from "./logo.svg";
const Bank = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [message, setMessage] = useState("No connection to the network."); //default message
  const [newMessage, setNewMessage] = useState("");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = newAccount => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = account => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={logo}></img>
      <h4> {"Connection"} </h4>
      <Button type="primary" shape="round" icon={<PoweroffOutlined />} size={"large"} onClick={connectWalletHandler}>
        {connButtonText}
      </Button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
      <br />

      <div className="deposit">
        <h3>
          Deposit:
          <Input
            type="text"
            size="small"
            placeholder="address token"
            style={{
              width: 300,
              margin: 10,
              marginLeft: 40,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint256 amount"
            style={{
              width: 300,
              marginLeft: 840,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="transaction value"
            style={{
              width: 300,
              marginLeft: 840,
              display: "block",
            }}
          />
          <Button
            style={{
              marginLeft: 300,
              marginTop: 10,
            }}
            type="primary"
            shape="round"
            icon={<DollarCircleTwoTone />}
          >
            Send
          </Button>
        </h3>
      </div>
      <br />

      <div className="getbalance">
        <h3
          style={{
            marginLeft: 100,
          }}
        >
          Get Balance:
          <Input
            type="text"
            size="small"
            placeholder="address token"
            style={{
              width: 300,
              margin: 10,
            }}
          />
          <Button
            style={{
              marginLeft: 10,
            }}
            type="primary"
            shape="round"
            icon={<ReadOutlined />}
          >
            Read
          </Button>
        </h3>
      </div>

      <br />

      <div className="GrantRole">
        <h3>
          Grant Role:
          <Input
            type="text"
            size="small"
            placeholder="bytes 32 role"
            style={{
              width: 300,
              margin: 10,
              marginLeft: 40,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="address acount"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Button
            style={{
              marginLeft: 400,
            }}
            type="primary"
            shape="round"
            icon={<DollarCircleTwoTone />}
          >
            Send
          </Button>
        </h3>
      </div>

      <br />

      <div className="IsAllowed">
        <h3 style={{ marginLeft: 100 }}>
          Is Allowed:
          <Input
            type="text"
            size="small"
            placeholder="address token address "
            style={{
              width: 300,
              margin: 10,
              marginLeft: 40,
            }}
          />
          <Button style={{ marginLeft: 10 }} type="primary" shape="round" icon={<ReadOutlined />}>
            Read
          </Button>
        </h3>
      </div>

      <br />

      <div className="SetAllowed">
        <h3>
          Set Allowed:
          <Input
            type="text"
            size="small"
            placeholder="addres token"
            style={{
              width: 300,
              margin: 10,
              marginLeft: 30,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="bool allowed"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Button type="primary" shape="round" icon={<DollarCircleTwoTone />}>
            Send
          </Button>
        </h3>
      </div>

      <br />

      <div className="SetHouse">
        <h3 style={{ marginRight: 10 }}>
          Set House EdgeSplit :
          <Input
            type="text"
            size="small"
            placeholder="addres token"
            style={{
              width: 300,
              margin: 10,
              marginLeft: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 16 bank"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 16 dividend"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 16 partner"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 16 treasury"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 16 team"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Button type="primary" shape="round" icon={<DollarCircleTwoTone />}>
            Send
          </Button>
        </h3>
      </div>

      <div className="setTokenVRFSubId">
        <h3 style={{ marginRight: 10 }}>
          set TokenVRF SubId :
          <Input
            type="text"
            size="small"
            placeholder="addres token"
            style={{
              width: 300,
              margin: 10,
              marginLeft: 10,
            }}
          />
          <Input
            type="text"
            size="small"
            placeholder="uint 64 subid"
            style={{
              width: 300,
              marginLeft: 850,
              display: "block",
              marginBottom: 10,
            }}
          />
          <Button type="primary" shape="round" icon={<DollarCircleTwoTone />}>
            Send
          </Button>
        </h3>
      </div>
    </div>
  );
};

export default Bank;
