import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const PORT = 5111;

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.all("/", (req, res) => {
  // console.log('I am Request-->', req);
  // console.log('I am Response-->', res);
  res.send("I am Up");
});

const todos = [
  {
    id: 1,
    title: "Title 1",
    completed: false,
  },
  {
    id: 2,
    title: "Title 2",
    completed: true,
  },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const data = req.body;

  todos.push(data);

  res.json({
    message: "Successfully Added",
  });
});

app.put("/todos/:id", (req, res)=>{
    const data = req.body;
    const itemId = +req.params.id;

    const indexToBeReplaced = todos.findIndex((item)=> item.id === itemId);

    if(indexToBeReplaced !== -1){
        todos[indexToBeReplaced] = {
            id: itemId,
            ...data
        }
    }

    console.log(indexToBeReplaced);

    res.json({
        status: `Successfully Updated Id - ${req.params.id}`,
    })
})
