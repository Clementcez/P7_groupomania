const app = require("./app");
const db = require("./models");

db.sequelize.sync()
.then((req) => {
    app.listen(3000, () =>{
        console.log("server running");
    });
});
