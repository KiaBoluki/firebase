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
const q = query(colRef, where("author", "==", "Kia Boluki")); //fieldName comparision value
```

### نکته

این تابع کوئری نسبت به حروف بزرگ و کوچک حساسه ، یعنی نتایج جستجو برای
"Kia Boluki"
با
"kia boluki"
فرق میکنه

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

## Ordering Data

فایربیس آیدی رو به صورت یک رشته کاملا تصادفی ایجاد میکنه .
برای همین اگه اطلاعات رو بر اساس آیدی مرتب کنیم در واقع کاملا نامرتب تحویل میده چون نظم و ترتیبی وجود نداره

بهتره که بر اساس یکی از پراپرتی ها مرتب کنیم

برای مرتب کردن اطلاعات از تابع `orderBy` استفاده میکنیم
و باید این تابع رو ایمپرت کنیم

```js
import { orderBy } from "firebase/firestore";
```

حالا میتونیم نتایج کوئری رو مرتب شده دریافت کنیم

```js
const q = query(
  colRef,
  where("author", "==", "Kia Boluki"),
  orderBy("name", "asc")
);
```

### نکته

اینجا فایربیس به ما ارور میده که میگه اطلاعات شما ایندکس گذاری نشده و باید ایندکس گذاری بشه

یه لینک توی کنسول بهمون میده که میتونیم روش کلیک کنیم و بریم مراحل ایندکس گذاری رو داخل سایت فایربیس انجام بدیم.
<img src="./documents/images/Screenshot 2022-12-26 185333.jpg">

این مراحل چند دقیقه زمان میبره تا اطلاعات داخل فایرستور ایندکس گذاری بشن.
<img src="./documents/images/Screenshot 2022-12-26 185853.jpg">

<img src="./documents/images/Screenshot 2022-12-26 190043.jpg">

#### مرتب کردن بر اساس زمان ایجاد رکورد

برای این کار میتونیم یه فیلد به داکیومنتمون اضافه کنیم تحت عنوان

```js
createdAt: Date();
```

اما خود فایربیس توابعی برای نگهداری زمان داره که بهتره از اونها استفاده کنیم. مثل

```js
import { serverTimestamp } from "firebase/firestore";
```

پس تابع اضافه کردن فیلد جدید رو به صورت زیر ویرایش میکنیم که همون زمان که داره رکورد جدید رو ثبت میکنه همون زمان هـــم تایم رو ذخیره کنه

```js
addDoc(colRef, {
  name: addFormElement.name.value,
  author: addFormElement.author.value,
  createdAt: serverTimestamp(),
}).then(() => addFormElement.reset());
```

حالا میتونیم اطلاعات دریافتی رو بر اساس زمان ثبت مرتب شده دریافت کنیم

```js
const q = query(
  colRef,
  where("author", "==", "Kia Boluki"),
  orderBy("createdAt", "asc")
);
```

### نکته

وقتی تایم استمپ اضافه میکنیم به کد ، اسنپشات دو بار اجرا میشه یکبار دیتا برای فایربیس ارسال میشه و فایربیس اونها رو ذخیره میکنه همون زمان بخاطر وجود تایم استمپ زمان رو محاسبه میکنه و به فیلد اضافه میکنه بنابراین ایونت سنپشات دو بار اتفاق میافته
