# Simple blog with Express JS and React

## Getting started

### 0. Host DB (skip if you have already had)
* You need to host Postgres DB 14 or higher
* You can use docker container or local installation
```
docker run --name some-postgres -e POSTGRES_USER=username POSTGRES_PASSWORD=mysecretpassword POSTGRES_DB=blog -d postgres
```

### 1. Create .env file
* Create .env file in the project root folder:
```
DATABASE_URL="postgresql://username:password@host:port/db_name"
PORT=desired_application_port
```

### 2. Install npm packages
```
npm install
```

### 3. Generate Prisma client
```
npx prisma generate
```

### 4. Migrate DB
```
npx prisma migrate dev
```

### 5. Populate DB with default data
```
npx prisma db seed
```

### 6. Build UI
* dev build
```
node "./node_modules/webpack/bin/webpack.js" --config "./blog-express-ui/config/webpack.dev.js"
```
* prod build
```
node "./node_modules/webpack/bin/webpack.js" --config "./blog-express-ui/config/webpack.prod.js"
```

### 7. Start application
```
node ./blog-express-be/src/app.js
```

