async function main() {
  // ### Exercise 1 ###

  function findMissing(input) {
    let total1 = 0;
    let total2 = 0;

    for (let index = 0; index <= input.length; index++) {
      total1 += input[index] || 0;
      total2 += index + 1;
    }

    return total2 - total1;

    /*
    // Another solution
    let totalExpected = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9;
    let totalFromInput = 0;

    for (let index = 0; index < input.length; index++) {
      totalFromInput += input[index];
    }

    return totalExpected - totalFromInput;
    */
  }

  console.log("### Exercise 1 ###");
  console.log(findMissing([8, 2, 3, 6, 4, 7, 1, 9]));
  console.log("");

  // ### Exercise 2 ###

  await (async () => {
    const cache = {};

    async function fetch(url) {
      if (url in cache) {
        console.log("Fetching from cache...", url);
        return cache[url];
      }

      console.log("Launching a request...", url);
      cache[url] = await Promise.resolve(url);

      return cache[url];
    }

    async function makeRequests() {
      console.log("### Exercise 2 ###");
      await fetch("/user");
      await fetch("/user/123");
      await fetch("/user");
      console.log("");
    }

    return makeRequests();
  })();

  // ### Exercise 3 ###

  console.log("### Exercise 3 ###");

  const fruits = [
    { id: 1, name: "Mango", tax: 10, price: 100 },
    { id: 2, name: "Apple", tax: 10, price: 200 },
    { id: 3, name: "Banana", tax: 0, price: 300 },
    { id: 4, name: "Lemon", price: 400 },
    { id: 5, name: "Tangerine", tax: 15, price: 500 },
    { id: 6, name: "Grape", tax: 10, price: 600 },
    { id: 7, name: "Kiwi", tax: 5, price: 700 },
    { id: 8, name: "Pear", tax: 10, price: 800 },
  ];
  const customers = [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Julian" },
  ];
  const sales = [
    {
      customer: 2,
      products: [
        { fruit: 1, quantity: 2 },
        { fruit: 2, quantity: 3 },
      ],
    },
    {
      customer: 2,
      products: [
        { fruit: 1, quantity: 1 },
        { fruit: 4, quantity: 2 },
      ],
    },
    {
      customer: 1,
      products: [
        { fruit: 4, quantity: 1 },
        { fruit: 6, quantity: 3 },
      ],
    },
  ];

  function exerciseA() {
    return fruits.reduce((result, fruit) => {
      return result + fruit.price;
    }, 0);
  }

  console.log("a.", exerciseA());

  function exerciseB(option) {
    if (option === "reduce") {
      return fruits.reduce((result, fruit) => {
        if ("tax" in fruit) {
          return [...result, fruit.name];
        }

        return result;
      }, []);
    }

    return fruits
      .filter((fruit) => {
        return "tax" in fruit;
      })
      .map((fruit) => {
        return fruit.name;
      });
  }

  console.log(
    "b.",
    "using reduce:",
    exerciseB("reduce"),
    "|",
    "using filter & map:",
    exerciseB("filter-map")
  );

  function exerciseC() {
    return fruits.map((fruit) => {
      return { name: fruit.name, total: fruit.price + (fruit.tax || 0) };
    });
  }

  console.log("c.", exerciseC());

  function exerciseD() {
    const ids = new Set();

    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        ids.add(product.fruit);
      });
    });

    return [...ids].map((fruitId) => {
      return getFruit(fruitId);
    });
  }

  console.log("d.", exerciseD());

  function exerciseE() {
    const customersSales = {};

    sales.forEach((sale) => {
      if (!(sale.customer in customersSales)) {
        customersSales[sale.customer] = {
          customer: getCustomer(sale.customer),
          sales: 0,
        };
      }

      customersSales[sale.customer].sales += sale.products.reduce(
        (result, product) => {
          const productDetails = getFruit(product.fruit);
          return result + productDetails.price * product.quantity;
        },
        0
      );
    });

    return Object.values(customersSales);
  }

  function getFruit(fruitId) {
    return fruits.find((fruit) => fruit.id === fruitId);
  }

  function getCustomer(customerId) {
    return customers.find((customer) => customer.id === customerId);
  }

  console.log("e.", exerciseE());
  console.log();

  // ### Last exercise ###

  console.log("### Last exercise (distributors and recursion) ###");

  const distributors = {
    "distributor A": 4,
    "distributor B": 7,
    "distributor C": {
      himself: 5,
      "distributor D": 2,
    },
    "distributor E": {
      himself: 1,
      "distributor F": 2,
      "distributor G": 4,
    },
    "distributor H": {
      himself: 1,
      "distributor I": {
        himself: 5,
        "distributor J": 2,
        "distributor K": 4,
      },
    },
  };

  function lastExercise(value) {
    return Object.values(value).reduce((result, value) => {
      return result + (typeof value === "number" ? value : lastExercise(value));
    }, 0);
  }

  console.log(lastExercise(distributors));
}

main();
