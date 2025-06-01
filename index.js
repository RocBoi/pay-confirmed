// index.js
const app = require('./server');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Pay Confirmed backend running on port ${PORT}`);
});
require('dotenv').config();
