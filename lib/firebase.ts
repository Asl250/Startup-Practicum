import { initializeApp } from "firebase/app";
import { getStorage, ref } from '@firebase/storage'
import { v4 as uuidv4 } from 'uuid'

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
const courseStorageRefs = ref(storage, `practikum/courses/${uuidv4()}`)

export { storage, courseStorageRefs }
