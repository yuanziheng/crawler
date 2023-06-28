let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.get('/', (req,res) => {
    res.send('./index.html', {root:__dirname});
})
app.listen(8010)