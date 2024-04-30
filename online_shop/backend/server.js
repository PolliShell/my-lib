const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require("./routes/bookRoutes");
const { app_aws, upload } = require("../backend/aws/aws");
const authorRoutes = require("../backend/routes/authorRoutes");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true }))

app.use("/shop", bookRoutes);
app.use("/authors", authorRoutes);
app.use(app_aws);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
