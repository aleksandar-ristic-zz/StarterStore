# StarterStore

## Complete e-commerce project built with Node.js, React, Redux, Express and MongoDB

This is full pledged online shop, with products, users, orders and payment.
Admins have full control of all aspects with admin-dashboard.

## Backend

- bcryptjs -colors -dotenv -express -express-async-handler -jsonwebtoken
  -mongoose -morgan -multer

### Two devDependecies

- nodemon
- concurrently

## Frontend

-axios -react -react-bootstrap -react-dom -react-helmet -react-paypal-button-v2
-react-redux -react-router-bootstrap -react-router-dom -react-scripts -redux
-redux-devtools-extension -redux-thunk

## Installation

Install the dependencies and devDependencies in main folder, then get into
frontend folder and install there.

```sh
npm i
cd frontend
npm i
cd ..
```

Also you can seed the database inside backend/data folder there is a file with
several items, just run

```
npm run data:import
```

to import them, or

```
npm run data:destroy
```

to destroy them

### Env variables

Next to package.json, you will see .env file with sorted names of variables, you
will first of all have to fill up those, in order for app to work.

After that just enter into console:

```
npm run dev
```

And concurrently will do its work If you are on the Linux systems, you might
have to type

```
sudo npm run dev
```

#### Conclusion

This was fun project, which helped me to excercise my fullstack abilities,
mostly data structures and how they work with eachother.

Huge thanks to Brad Traversy, an amazing programmer and even better teacher,
whose Udemy course helped me get back on right path, everytime I've had doubts.
Full link to course is here:
[MERN Stack Front To Back: Full Stack React, Redux & Node.js](https://www.udemy.com/course/mern-stack-front-to-back/)
