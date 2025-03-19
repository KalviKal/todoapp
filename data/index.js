// MongoDB
const {MongoClient} = require("mongodb")
const andmebaas = "todo-app"
const salasona = "qprYdiFHx452u9"
//const mongoUrl = `mongodb+srv://matka-app:${salasona}@cluster0.vpkdv.mongodb.net/${andmebaas}?retryWrites=true&w=majority`
const mongoUrl = `mongodb+srv://todoapp:${salasona}@cluster0.7caxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);


const todod = [
    {
        nimetus: "prae muna",
        prioriteet: 1,
        kasTehtud: true
    }
 ]
 

 function loeTodoAndmed(){
    return todod
 }

 function lisaTodoData({nimetus, prioriteet, kasTehtud}){
   todod.push({nimetus, prioriteet, kasTehtud})
 }

// MongoDB jaoks
async function lisaTodoData(todo){

   try {
      await client.connect();
      const database = client.db(andmebaas);
      const todod = database.collection("todod");
      const result = await todod.insertOne(todo)
      console.log(`A document was inserted with the _id: ${result.insertedId}`)
    } finally {
      await client.close();
    }
   
}

async function loeTodoAndmed(){
    try {
        await client.connect();
        const database = client.db(andmebaas);
        const tododCollections = database.collection("todod");
        //const filter = { todo: req.params.indeks}
        //const filter = { todo}
    
        //result = await todod.find(filter).toArray()
        const todod = await tododCollections.find({}).toArray()
        //console.log(todod)
        //console.log(todod[0])
        return todod
    } finally {
        await client.close();
        
    }
} 



module.exports = {
    loeTodoAndmed,
    lisaTodoData
 }
