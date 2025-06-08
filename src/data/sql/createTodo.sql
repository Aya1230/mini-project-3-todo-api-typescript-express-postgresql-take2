INSERT INTO todos (title, description, completed)
VALUES ($1, $2, $3)
RETURNING *;
