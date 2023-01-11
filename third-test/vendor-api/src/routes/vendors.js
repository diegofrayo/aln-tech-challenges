const express = require("express");
const VENDORS = require("../data/vendors.json");

const router = express.Router();

router.use(function authMiddleware(req, res, next) {
  const customerKey = req.headers["x-customer-key"];
  const customerApiKeyConfig = VENDORS["api-customers"][customerKey];

  if (customerApiKeyConfig && customerApiKeyConfig.enabled === true) {
    next();
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
});

router.post("/", async function (req, res, next) {
  const { fruitName } = req.body;
  const vendorsIds = VENDORS["fruits-providers"][fruitName];

  if (!vendorsIds) {
    res.json([]);
    return;
  }

  const providers = vendorsIds.map((id) => {
    return VENDORS.providers.find((provider) => provider.id === id);
  });

  res.json(providers);
});

module.exports = router;
