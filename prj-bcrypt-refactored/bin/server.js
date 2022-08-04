const app = require('../src/app');

const port = normalizaPort('3000');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

 app.listen(port, function () {
     
    console.log(`app ouvindo na porta http://0.0.0.0:${port}`);
}) 