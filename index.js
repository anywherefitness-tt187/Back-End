const server = require("./api/server");

require("dotenv").config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\ ** Server is running on port: ${port} ** \n`);
});
