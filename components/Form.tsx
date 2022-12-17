import React from "react";
import Head from "next/head";
import { useFruitsStore } from "../context";

export default function Form() {
  const { addFruit } = useFruitsStore();
  const [inputValue, setInputValue] = React.useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.currentTarget.value);
  }

  function onClickHandler(): void {
    addFruit(inputValue);
  }

  return (
    <div className="tw-flex tw-justify-between tw-border-2 tw-border-black">
      <input
        type="text"
        className="tw-flex-1 tw-border-r-2 tw-border-black"
        value={inputValue}
        onChange={onChangeHandler}
      />
      <button
        className="tw-flex-shrink-0 tw-text-lg tw-px-2"
        onClick={onClickHandler}
      >
        +
      </button>
    </div>
  );
}
