"use client";

import { Dispute, bet, claimPrize, getDispute } from "@/services/web3";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";

export default function Home() {
  const [message, setMessage] = useState("");
  const [dispute, setDispute] = useState<Dispute>({
    candidate1: "Loading...",
    candidate2: "Loading...",
    image1:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWFM1IG7wiMV5ef2xI-Yyxq2KCeWsjovfn5G42EwcKG15qAKzkCA2GH_V8xI3MrM0ADI&usqp=CAU",
    image2:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWFM1IG7wiMV5ef2xI-Yyxq2KCeWsjovfn5G42EwcKG15qAKzkCA2GH_V8xI3MrM0ADI&usqp=CAU",
    total1: 0,
    total2: 0,
    winner: 0,
  });
  const { push } = useRouter();

  useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) push("/");

    setMessage("Loading dispute data...");
    getDispute()
      .then((disputeFromWeb3) => {
        console.log(disputeFromWeb3);
        setDispute(disputeFromWeb3);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  }, [push]);

  const processBet = (candidate: number) => {
    setMessage("Processing bet...");
    const amount = prompt("How much do you want to bet?");
    if (!amount) return;

    bet(candidate, parseInt(amount))
      .then(() => {
        setMessage(
          "Bet processed successfully. It can take one minute to update the data."
        );
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const claimPrizeClick = () => {
    setMessage("Claiming prize...");
    claimPrize()
      .then(() => {
        alert("Prize claimed successfully.");
        setMessage("");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  return (
    <>
      <Head>
        <title>BetCandidate | Apostar</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row align-items-center">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            BetCandidate
          </h1>
          <p className="lead">Bet in the american election</p>
          {dispute.winner == 0 ? (
            <p className="lead">
              You have until the day of the election to let your bet on one of
              the candidates below. Do not miss the opportunity to win big.
            </p>
          ) : (
            <p className="lead">
              The election has ended. See the winner and claim your prize!
            </p>
          )}
        </div>
        <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
          <div className="col"></div>
          {dispute.winner == 0 || dispute.winner == 1 ? (
            <div className="col">
              <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                {dispute.candidate1}
              </h3>
              <Image
                src={
                  dispute.image1 === "hgfdhdfg"
                    ? "http://bit.ly/3zmSfiA"
                    : dispute.image1
                }
                className="d-block mx-auto img-fluid rounded"
                width={250}
                height={250}
                alt="Donald Trump"
              />
              {dispute.winner == 1 ? (
                <button
                  className="btn btn-primary p-3 my-2 d-block mx-auto"
                  style={{ width: 250 }}
                  onClick={claimPrizeClick}
                >
                  Claim Prize
                </button>
              ) : (
                <button
                  className="btn btn-primary p-3 my-2 d-block mx-auto"
                  style={{ width: 250 }}
                  onClick={() => processBet(1)}
                >
                  Bet in this candidate
                </button>
              )}
              <span
                className="badge text-bg-secondary d-block mx-auto"
                style={{ width: 250 }}
              >
                {Web3.utils.fromWei(dispute.total1, "ether")} POL Betted
              </span>
            </div>
          ) : (
            <></>
          )}
          {dispute.winner == 0 || dispute.winner == 2 ? (
            <div className="col">
              <h3 className="my-2 d-block mx-auto" style={{ width: 250 }}>
                {dispute.candidate2}
              </h3>
              <Image
                src={
                  dispute.image2 === "hgfdhdfg"
                    ? "http://bit.ly/4gF4mYO"
                    : dispute.image2
                }
                className="d-block mx-auto img-fluid rounded"
                width={250}
                alt="Kamala Harris"
                height={250}
              />
              {dispute.winner == 2 ? (
                <button
                  className="btn btn-primary p-3 my-2 d-block mx-auto"
                  style={{ width: 250 }}
                  onClick={claimPrizeClick}
                >
                  Claim Prize
                </button>
              ) : (
                <button
                  className="btn btn-primary p-3 my-2 d-block mx-auto"
                  style={{ width: 250 }}
                  onClick={() => processBet(2)}
                >
                  Bet in this candidate
                </button>
              )}
              <span
                className="badge text-bg-secondary d-block mx-auto"
                style={{ width: 250 }}
              >
                {Web3.utils.fromWei(dispute.total2, "ether")} POL Apostados
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="row align-items-center">
          <p className="message">{message}</p>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-4 mb-0 text-body-secondary">
            &copy; 2024 BetCandidate, Inc
          </p>
          <ul className="nav col-4 justify-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">
                About
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
