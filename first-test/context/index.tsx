import React from "react";

const FruitsContext = React.createContext(
  {} as {
    addFruit: (newFruit: string) => void;
    deleteFruit: (fruitToDelete: string) => void;
    fruits: string[];
  }
);

export function AppContext({ children }: { children: React.ReactNode }) {
  const [fruits, setFruits] = React.useState<string[]>(["Oranges"]);

  function addFruit(newFruit: string): void {
    if (fruits.length === 5) {
      alert("You reached the maximum");
    } else if (!fruits.includes(newFruit)) {
      setFruits([...fruits, newFruit]);
    } else {
      alert("This fruit already exists, it could not be added");
    }
  }

  function deleteFruit(fruitToDelete: string) {
    if (fruits.length === 1) {
      alert("There should exist at least one element....");
    } else {
      setFruits(
        fruits.filter((fruit) => {
          return fruit !== fruitToDelete;
        })
      );
    }
  }

  return (
    <FruitsContext.Provider
      value={{
        addFruit,
        deleteFruit,
        fruits,
      }}
    >
      {children}
    </FruitsContext.Provider>
  );
}

export function useFruitsStore() {
  return React.useContext(FruitsContext);
}
