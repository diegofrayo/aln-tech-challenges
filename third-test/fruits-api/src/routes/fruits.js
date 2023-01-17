const express = require("express");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const firebaseService = require("../services/firebase");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const fruits = (await firebaseService.get("/fruits")) || {};
    const withVendors = req.query.withVendors === "true";

    if (withVendors) {
      for (let fruitId in fruits) {
        const fruitVendors = await getFruitVendors(fruits[fruitId].name);
        fruits[fruitId].vendors = fruitVendors;
      }
    }

    res.json(Object.values(fruits));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:fruitId", async function (req, res) {
  try {
    const fruit = await firebaseService.get(`/fruits/${req.params.fruitId}`);
    const withVendors = req.query.withVendors === "true";

    if (!fruit) {
      res.status(404).json({ error: `"${req.params.fruitId}" does not exist` });
      return;
    }

    if (withVendors) {
      const fruitVendors = await getFruitVendors(fruit.name);
      fruit.vendors = fruitVendors;
    }

    res.json(fruit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async function (req, res) {
  try {
    const fruitToCreate = { ...req.body, id: uuidv4() };
    await firebaseService.write(`/fruits/${fruitToCreate.id}`, fruitToCreate);

    const createdFruit = await firebaseService.get(
      `/fruits/${fruitToCreate.id}`
    );
    res.status(201).json(createdFruit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:fruitId", async function (req, res) {
  try {
    const { fruitId } = req.params;
    const fruitToDelete = await firebaseService.get(`/fruits/${fruitId}`);

    if (!fruitToDelete) {
      res
        .status(404)
        .json({ error: `"${fruitId}" does not exist, so it wasn't deleted` });
      return;
    }

    await firebaseService.remove(`/fruits/${fruitId}`);
    res.json(fruitToDelete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:fruitId", async function (req, res) {
  try {
    const { fruitId } = req.params;
    const fruitUpdates = req.body;
    const fruitToUpdate = await firebaseService.get(`/fruits/${fruitId}`);

    if (!fruitToUpdate) {
      res
        .status(404)
        .json({ error: `"${fruitId}" does not exist, so it wasn't updated` });
      return;
    }

    await firebaseService.update(`/fruits/${fruitId}`, fruitUpdates);
    res.json({ ...fruitToUpdate, ...fruitUpdates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

// --- Utils ---

function getFruitVendors(fruitName) {
  return axios
    .post(
      "http://localhost:4000/vendors",
      { fruitName },
      { headers: { "x-customer-key": "X3FWMYtoTAAfa9keS4c2hVUiWmW4fwli" } }
    )
    .then(function (response) {
      return response.data;
    });
}
