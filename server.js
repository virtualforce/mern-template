const app = require("./backend/app");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running at ${port}`));
