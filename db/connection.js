const mongooes = require('mongoose');

mongooes.set('strictQuery', false);

mongooes.connect("mongodb+srv://talamishva05:987654321@78cluster0.pxjb8x5.mongodb.net/add-data?retryWrites=true&w=majority", {
    useNewUrlParser: true,
}).then(() => {
    console.log('connection done...');
}).catch((error) => {
    console.log(error);
})

