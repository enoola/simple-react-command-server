'
# the project
simple server, to quickly handles various command of your choice
the wall idea is that I will checkout the project as base for another use

## Generation
```
mkdir simple-react-command-server
cd simple-react-command-server
npm init -y
npm install express
npm install --save-dev typescript ts-node
npm i --save-dev @types/express
npm i --save-dev @types/cors
npm i install --save-dev ts-node-dev
```

## Setup

```bash
git clone https://github.com/enoola/simple-react-command-server.git
cd simple-react-command-server
```
You probably want to change this to your git project
```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/YOUR_PROJECT_NAME.git
#shall work for gitlab which I do not use atm
git branch -M main
git push -u origin main
```

/!\ Copy .env file to .env.local, edit to put your values
content of .env global, not sensible variables

## Install npm package
`npm install`

## Launch the project
### fastest way from 1 terminal
we use the below
`npm run dev`
which ultimately launches : nodemon --watch src --exec myworkmaterial/watch_transpile_relaunchwebserv.sh
cf: https://nodemon.io/

### Watch then nodemon 2 terminal required
## Retraspile if file changes in the server folder src
`npm run watch`

## will restart the server once a file is modified
# nodemon --watch src --exec myworkmaterial/watch_transpile_relaunchwebserv.sh
node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts
`npm run dev2steps`
```

Useful : https://expressjs.com/en/guide/routing.html

# testing
with use Jest, 
supertest : library to test HTTP request 
```bash
npm run jtest
```

## todo:
 - implement 1 function calling open remote APIs 
 - implement 1 function to execute command localy ?
