import React from "react";
import { useFruitsStore } from "../context";

export default function List() {
  const { fruits, deleteFruit } = useFruitsStore();

  function handleDeleteFruitClick(fruitToDelete: string) {
    return () => {
      deleteFruit(fruitToDelete);
    };
  }

  return (
    <div className="tw-border-2 tw-border-black tw-p-4">
      <ul>
        {fruits.map((fruit) => {
          return (
            <li key={fruit}>
              <span>{fruit}</span>
              {fruits.length > 1 ? (
                <button
                  className="tw-ml-2 tw-text-lg tw-font-bold"
                  onClick={handleDeleteFruitClick(fruit)}
                >
                  x
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
