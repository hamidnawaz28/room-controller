import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { REAL_TIME_DB_CONFIG, DB_NAME } from "../config/creds";

const app = initializeApp(REAL_TIME_DB_CONFIG);

const dbConnection = async () => {
  return ref(getDatabase(app));
};

const getADB = async (db, dbPath) => {
  const snapshot = await get(child(db, dbPath));
  return await snapshot.val();
};

const getDataWithListener = async (dbRef, extratData) => {
  return onValue(dbRef, (snap) => {
    extratData(snap.val());
  });
};

const roomControllerListener = async (getData) => {
  const dbRef = ref(getDatabase(app), DB_NAME);
  const data = await getDataWithListener(dbRef, getData);
  return data;
};

const roomControllerData = async () => {
  const db = await dbConnection();
  return await getADB(db, DB_NAME);
};

export { roomControllerData, roomControllerListener };
