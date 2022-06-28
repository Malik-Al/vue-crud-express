const express = require('express');
const bodyParser = require('body-parser');
const db = require("./app/models")
const cors = require('cors');
const app = express()


// DB CONNECT
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

let corsOptions = {
    origin: "http://localhost:8081"
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.json({message: "Welcome to bezkoder application"})
})

const PORT = process.env.PORT || 8080

require("./app/routes/ turorial.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
