# Installation

ابتدا فایراستور رو توی خود سایت پیکر بندی میکنیم
یه سری تنظیمات به صورت آبجکت جیسون بهمون میده که میذاریم داخل فایل و با اون ارتباط با فایرستور رو ایجاد میکنیم

```js
const firebaseConfig = {
  apiKey: "AIzaSyBBrP4zlK9jl4OAb2mP1EICCEVACncCvhQ",
  authDomain: "fir-9-dojo-c87a9.firebaseapp.com",
  projectId: "fir-9-dojo-c87a9",
  storageBucket: "fir-9-dojo-c87a9.appspot.com",
  messagingSenderId: "45905629228",
  appId: "1:45905629228:web:9fe8d1c0b3c2e9c0d88189",
};
```

بعد باید توابع زیر رو از فایربیس اپ و فایرستور ایمپرت کنیم

```js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
```

بعدش برای اینیشیالایز کردن اپ و فایر استور کدهای زیر رو میزنیم

```js
// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
```

حالا باید برای اطلاعات داخل فایرستور یه کالکشن ایجاد کنیم

```js
// collection ref
const colRef = collection(db, "books");
```

حالا میتونیم از توابع فایرستور برای اضافه کردن، حذف کردن و فراخوانی داده ها از این توابع استفاده کنیم

```js
// ref collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
```

```js
addDoc(colRef, {
  name: addFormElement.name.value,
  author: addFormElement.author.value,
}).then(() => addFormElement.reset());
```

```js
const docRef = doc(); // get the specified doc
deleteDoc(db, "books", doc.id); // Database , Collection Name , Doc id
```

تابع زیر هر زمان که تغییری در کالکشن ایجاد بشه فراخوانی میشه

```js
onSnapshot(colRef, (snapshot) => {
  // میتونیم به تک تک داکیومنت ها دسترسی داشته باشیم

  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});
```

## Firestore Queries

```js
const q = query(colRef, where("author", "=", "Kia Boluki")); //fieldName comparision value
```

حالا باید از تابع سنپشات استفاده کنیم که آخرین تغییرات رو به ما بده

```js
onSnapshot(q, (snapshot) => {
  // دقت کن اینجا به جای کالرف از کیو استفاده شده
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});
```
