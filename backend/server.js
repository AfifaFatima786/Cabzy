const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const { initialiseSocket } = require('./socket'); // Make sure path is correct

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// ✅ IMPORTANT: Initialize socket with the server
initialiseSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
