//Part1: Core Modules
//1. Use a readable stream to read a file in chunks and log each chunk.
// const fs = require("fs");
// const stream = fs.createReadStream("./big.txt", {
//   encoding: "utf8",
//   highWaterMark: 644
// });
// stream.on("data", (chunk) => {
//   console.log("Chunk:", chunk);
// });
// stream.on("end", () => {
//   console.log("Finished reading file");
// });
//=============================================================================
//2. Use readable and writable streams to copy content from one file to another.
// const fs = require("fs");
// const readStream = fs.createReadStream("./source.txt");
// const writeStream = fs.createWriteStream("./dest.txt");

// readStream.pipe(writeStream);

// writeStream.on("finish", () => {
//   console.log("File copied using streams");
// });
//===========================================================================
//3. Create a pipeline that reads a file, compresses it, and writes it to another file.
// const fs = require("fs");
// const zlib = require("zlib");
// const { pipeline } = require("stream");
// pipeline(
//   fs.createReadStream("./data.txt"),
//   zlib.createGzip(),
//   fs.createWriteStream("./data.txt.gz"),
//   (err) => {
//     if (err) {
//       console.log("Error");
//     } else {
//       console.log("File compressed successfully");
//     }
//   }
// );
//===========================================================================
//Part2: Simple CRUD Operations Using HTTP
//For allthe following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).
//1.Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)
// URL: POST /user

// const http = require("http");
// const fs = require("fs");
// http.createServer((req, res) => {
//   if (req.url === "/user" && req.method === "POST") {
//     let body = "";

//     req.on("data", chunk => body += chunk);

//     req.on("end", () => {
//       const users = JSON.parse(fs.readFileSync("users.json"));
//       const newUser = JSON.parse(body);

//       const exists = users.some(u => u.email === newUser.email);
//       if (exists) {
//         res.end("Email already exists");
//         return;
//       }
//       newUser.id = Date.now();
//       users.push(newUser);

//       fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//       res.end("User added");
//     });
//   }
// }).listen(3000, () => {
//   console.log("Add User API running");
// });
//https://nassefm807-7801898.postman.co/workspace/Mahmoud-Sami-Nassef's-Workspace~2c8f71e3-56cd-43ad-874e-f48b10c4129c/request/51125510-ffc989b0-186d-46cc-904c-93ac2c44a83b?action=share&creator=51125510&active-environment=51125510-a6a01ba8-8aeb-4d6b-ac3f-555686cd98a7
//===========================================================================
// 2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL
// Note: Remember to update the corresponding values in the JSON file
// URL: PATCH /user/id

// const http = require("http");
// const fs = require("fs");
// http.createServer((req, res) => {
//   if (req.url.startsWith("/user") && req.method === "PATCH") {
//     const id = req.url.split("/")[2];
//     let body = "";
//     req.on("data", chunk => body += chunk);
//     req.on("end", () => {
//       const users = JSON.parse(fs.readFileSync("users.json"));
//       const updates = JSON.parse(body);
//       const user = users.find(u => u.id == id);
//       if (!user) {
//         res.end("User not found");
//         return;
//       }
//       Object.assign(user, updates);
//       fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
//       res.end("User updated");
//     });
//   }
// }).listen(3000, () => {
//   console.log("Update User API running");
// });
//===========================================================================
// 3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
// Note: Remember to delete the user from the file
// o URL: DELETE /user/id

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   if (req.url.startsWith("/user") && req.method === "DELETE") {
//     const id = req.url.split("/")[2];

//     const users = JSON.parse(fs.readFileSync("users.json"));
//     const newUsers = users.filter(u => u.id != id);

//     fs.writeFileSync("users.json", JSON.stringify(newUsers, null, 2));
//     res.end("User deleted");
//   }
// });

// server.listen(3000, () => {
//   console.log("Delete User API running");
// });
//===========================================================================
// 4. Create an API that gets all users from the JSON file.
// URL: GET /user

// const http = require("http");
// const fs = require("fs");

// http.createServer((req, res) => {
//   if (req.url === "/user" && req.method === "GET") {
//     const users = fs.readFileSync("users.json");
//     res.end(users);
//   }
// }).listen(3000, () => {
//   console.log("Get All Users API running");
// });
//===========================================================================
// 5. Create an API that gets User by ID.
// URL: GET /user/:id

// const http = require("http");
// const fs = require("fs");
// http.createServer((req, res) => {
//   if (req.url.startsWith("/user") && req.method === "GET") {
//     const id = req.url.split("/")[2];
//     const users = JSON.parse(fs.readFileSync("users.json"));

//     const user = users.find(u => u.id == id);
//     res.end(JSON.stringify(user || "User not found"));
//   }
// }).listen(3000, () => {
//   console.log("Get User By ID API running");
// });
//===========================================================================
//https://nassefm807-7801898.postman.co/workspace/Mahmoud-Sami-Nassef's-Workspace~2c8f71e3-56cd-43ad-874e-f48b10c4129c/collection/51125510-c03060f0-7a72-46d2-a20c-97c923306328?action=share&source=copy-link&creator=51125510
