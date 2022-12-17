import React from "react";
import { useFruitsStore } from "../context";

export default function Slogan() {
  const { fruits } = useFruitsStore();

  function renderMessage() {
    if (fruits.length === 1) {
      return fruits[0];
    }

    return `${fruits.slice(0, fruits.length - 1).join(",")} and ${fruits.slice(
      fruits.length - 1
    )}`;
  }

  return (
    <div className="tw-p-4 tw-border-2 tw-border-black">
      We sell: {renderMessage()}
    </div>
  );
}
