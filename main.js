const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Приклад масиву об'єктів
let objects = [
  { id: 1, name: 'Об\'єкт 1', description: 'Це перший об\'єкт' },
  { id: 2, name: 'Об\'єкт 2', description: 'Це другий об\'єкт' },
  { id: 3, name: 'Об\'єкт 3', description: 'Це третій об\'єкт' },
  { id: 4, name: 'Об\'єкт 4', description: 'Це четвертий об\'єкт' },
  { id: 5, name: 'Об\'єкт 5', description: 'Це п\'ятий об\'єкт' }
];

// Ендпойнт для отримання масиву об'єктів у форматі JSON
app.get('/api/objects', (req, res) => {
  res.json(objects);
});

// Генерація нового ID
function generateId() {
  const ids = objects.map(obj => obj.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
}

// Ендпойнт для додавання нового об'єкта
app.post('/api/objects', (req, res) => {
  const newObject = req.body;
  newObject.id = generateId(); // Генеруємо новий ID для об'єкта
  objects.push(newObject);
  res.sendStatus(201);
});

// Ендпойнт для редагування об'єкта
app.put('/api/objects/:id', (req, res) => {
  const objectId = parseInt(req.params.id);
  const updatedObject = req.body;
  objects = objects.map(obj => {
    if (obj.id === objectId) {
      return { ...obj, ...updatedObject };
    }
    return obj;
  });
  res.sendStatus(200);
});

// Ендпойнт для видалення об'єкта
app.delete('/api/objects/:id', (req, res) => {
  const objectId = parseInt(req.params.id);
  objects = objects.filter(obj => obj.id !== objectId);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущено на порті 3000');
});
