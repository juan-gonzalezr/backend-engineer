import app from './app'
import {conectDB} from './db'

conectDB()
const PORT= 3000

app.get('/',(_req,res)=>{
    console.log('Initial apiss');
    res.send('holandaaaa mesi asasa')

})

app.listen(PORT,()=>{
    console.log(`Server runing in ${PORT}`);
})