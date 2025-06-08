UPDATE todos
SET title = $1,
    description = $2,
    completed = $3
WHERE id = $4
RETURNING *;
