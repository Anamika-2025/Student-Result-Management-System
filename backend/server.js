const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/marks', require('./routes/markRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
