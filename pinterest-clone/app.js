require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use('/auth', require('./routes/userRoutes'));
app.use('/pins', require('./routes/pinsRoutes'));
app.use('/boards', require('./routes/boardsRoutes'));
app.use('/comments', require('./routes/commentsRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})