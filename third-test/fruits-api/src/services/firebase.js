const { initializeApp } = require("firebase/app");
const {
  child,
  getDatabase,
  ref,
  set,
  get: firebaseGet,
  update: firebaseUpdate,
} = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCPW7jEptuJ32LjYBFQCBX2UuZC9g2qOok",
  authDomain: "dfr-tests.firebaseapp.com",
  databaseURL: "https://dfr-tests-default-rtdb.firebaseio.com",
  projectId: "dfr-tests",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function get(path) {
  const dbRef = ref(database);

  return firebaseGet(child(dbRef, `test/${path}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }

      return null;
    })
    .catch((error) => {
      console.error(error);
    });
}

function write(path, data) {
  return set(ref(database, `test/${path}`), data);
}

function remove(path) {
  return set(ref(database, `test/${path}`), null);
}

function update(path, updates) {
  return firebaseUpdate(ref(database, `test/${path}`), updates);
}

module.exports = {
  get,
  remove,
  update,
  write,
};
