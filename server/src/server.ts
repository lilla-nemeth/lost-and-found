import app from './app';

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server is running on 8080'));
