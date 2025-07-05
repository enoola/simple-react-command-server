#!/opt/homebrew/bin/bash
#
# 2025/07/05
## Will be invoked within package.json : ./node_modules/.bin/nodemon --watch src --ext ts --exec
#at the moment : "devc": "./node_modules/.bin/nodemon --watch src --ext ts --exec ./myworkmaterial/watch_transpile_relaunchwerbser.sh"
#
#

echo "Invoked "`date`
echo "Transpilation time"
echo "I will invoke: tsc --config tsconfig.json"
tsc --config tsconfig.json

echo "Time to relaunch webserver"
echo "I will now invoke : node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts"
node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts
echo "End of script."
#./node_modules/.bin/nodemon --watch src --ext ts --exec "node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts"
./node_modules/.bin/nodemon --watch src --ext ts --exec "node --loader ts-node/esm --experimental-specifier-resolution=node src/index.ts"

