const { initializeApp } = require("firebase/app");
const {
  child,
  getDatabase,
  ref,
  set,
  get: firebaseGet,
  update: firebaseUpdate,
} = require("firebase/database");

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCPW7jEptuJ32LjYBFQCBX2UuZC9g2qOok",
  authDomain: "dfr-tests.firebaseapp.com",
  databaseURL: "https://dfr-tests-default-rtdb.firebaseio.com",
  projectId: "dfr-tests",
};
const app = initializeApp(FIREBASE_CONFIG);
const database = getDatabase(app);
const BASE_PATH = "test";

function get(path) {
  const dbRef = ref(database);

  return firebaseGet(child(dbRef, `${BASE_PATH}/${path}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  });
}

function write(path, data) {
  return set(ref(database, `${BASE_PATH}/${path}`), data);
}

function update(path, updates) {
  return firebaseUpdate(ref(database, `${BASE_PATH}/${path}`), updates);
}

function remove(path) {
  return write(path, null);
}

module.exports = {
  get,
  write,
  update,
  remove,
};
