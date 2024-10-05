"use client";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginWithMetamask } from "@/services/web3";

export default function Home() {
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  const onLoginClick = async () => {
    loginWithMetamask()
      .then(() => {
        push("/bet");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.message);
      });
  };
  return (
    <>
      <Head>
        <title>BetCandidate | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <Image
              src="https://s2-valor.glbimg.com/tCti3QVmVufuHaApkmr3EZJbiAE=/0x0:1846x1390/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2024/K/L/HoLS1USZAqz9Uqv9Bhow/montagem2a-2b.jpg"
              className="d-block mx-lg-auto img-fluid"
              width="700"
              height="500"
              alt="presidents"
            ></Image>
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              BetCandidate
            </h1>
            <p className="lead">Bets on the american election !! </p>
            <p className="lead">
              Authenticate with your wallet and start betting on the next
              dispute. Do not miss the opportunity to win big.
            </p>
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4"
                onClick={onLoginClick}
              >
                <Image
                  src="/metamask.svg"
                  width="64"
                  height="64"
                  alt="metamask"
                  className="me-3"
                ></Image>
                Connect to Metamask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
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
