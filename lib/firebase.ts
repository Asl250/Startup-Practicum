import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyDK-i-GAfAQFNl2pKJhSJh5kzvAFLuHZLE",
	authDomain: "practicum-sammi-lms.firebaseapp.com",
	projectId: "practicum-sammi-lms",
	storageBucket: "practicum-sammi-lms.appspot.com",
	messagingSenderId: "701703021913",
	appId: "1:701703021913:web:0b406fb5074b739ebd1848"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }
