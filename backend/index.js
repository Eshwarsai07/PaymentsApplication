const express = require("express")
const app =express();
const rootRouter  = require('./routes/index');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = 3000

app.use('/api/v1',rootRouter);


app.listen(PORT,function(){
    console.log(`Listening to PORT ${PORT}`)
})
