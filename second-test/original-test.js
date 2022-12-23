// Archivo original de la prueba

function findMissing(input) {
  let missing = 0;

  for (let index = 1; index <= 9; index++) {
    if (input.includes(index)) {
      continue;
    } else {
      missing = index;
    }
  }

  return missing;
}

// console.log(findMissing([8, 2, 3, 6, 4, 7, 1, 5]));

// second

const cache = {};

async function fetch(url) {
  if (cache[url] !== undefined) {
    console.log("get from cache", url);
    return cache[url];
  }

  console.log("launch request", url);
  cache[url] = await makeRequest();

  return cache[url];
}

function makeRequest() {
  return Promise.resolve(new Date().getTime());
}

async function main() {
  await fetch("/user");
  await fetch("/user/123");
  await fetch("/user");
}

// main();

// -- third

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

function getTotalPrice() {
  return fruits.reduce((result, fruit) => {
    return result + fruit.price;
  }, 0);
}

// console.log(getTotalPrice());

function second() {
  return fruits
    .filter((fruit) => {
      return "tax" in fruit;
    })
    .map((fruit) => {
      return fruit.name;
    });
}

// console.log(second());

function ccc() {
  return fruits.map((fruit) => {
    return { name: fruit.name, total: fruit.price + (fruit.tax || 0) };
  });
}

// console.log(ccc());

function ddd() {
  const ids = {};

  sales.forEach((sale) => {
    sale.products.forEach((product) => {
      ids[product.fruit] = product.fruit;
    });
  });

  return Object.keys(ids);
}

// console.log(ddd());

function eee() {
  const customersSales = {};

  sales.forEach((sale) => {
    let total = 0;

    if (customersSales[sale.customer] === undefined) {
      customersSales[sale.customer] = {
        customerId: sale.customer,
        sales: 0,
      };
    }

    sale.products.forEach((product) => {
      const productDetails = getFruit(product.fruit);
      total += productDetails.price * product.quantity;
    });

    customersSales[sale.customer].sales += total;
  });

  return customersSales;
}

function getFruit(fruitId) {
  return fruits.find((fruit) => fruit.id === fruitId);
}

// console.log(eee());

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

function aaa(value) {
  return Object.values(value).reduce((result, value) => {
    if (typeof value === "number") {
      return result + value;
    } else {
      return result + aaa(value);
    }
  }, 0);
}

console.log(aaa(distributors));
