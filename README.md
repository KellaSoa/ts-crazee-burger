# Crazee Burger

## 1. Install project

```
yarn install
```

## 2. Connect project with backend firebase, create file .env :

```
VITE_APP_API_KEY = ???
VITE_APP_AUTH_DOMAIN = ???
VITE_APP_PROJECT_ID = ???
VITE_APP_STORAGE_BUCKET = ???
VITE_APP_MESSAGING_SENDER_ID = ???
VITE_APP_APP_ID = ???
```

firebase-config.js > these variables will be consumed via import.meta.env.VITE_APP_API_KEY

P.S. Without config, you won’t be able to access the order page. You’ll be stuck on the login page

## 3. Run projet

```
yarn dev
```
