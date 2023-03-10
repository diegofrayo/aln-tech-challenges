import React from "react";
import Head from "next/head";

import Form from "../components/Form";
import List from "../components/List";
import Slogan from "../components/Slogan";
import { AppContext } from "../context";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fruits store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="tw-p-3">
        <AppContext>
          <Form />
          <hr className="tw-my-1 tw-h-px tw-border-0" />
          <Slogan />
          <hr className="tw-my-1 tw-h-px tw-border-0" />
          <List />
        </AppContext>
      </main>
    </div>
  );
}
