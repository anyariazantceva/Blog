const express = require("express");
const fs = require("fs");
const app = express();
const port = 4000;
const statLocation = __dirname + "/posts.txt";

app.use(express.static(__dirname + "/public/"));

let totalPosts = parseInt(fs.readFileSync(statLocation));

app.get("/save", (req, res) => {
    totalPosts += parseInt(req.query.posts);

    // запись в файл
    fs.writeFile(statLocation, totalPosts, (err) => {
        if (err) {
            console.log("Ошибка записи в файл!");
        }
    });

    // отправляем статус ответа 200 (без текста)
    res.sendStatus(200);
});

app.get("/posts", (req, res) => {

    res.send(totalPosts.toString());
});


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`) ;
});