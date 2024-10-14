const app = require('./app');

const PORT = process.env.PORT || 5000;

// Start the server and listen on a specified port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
