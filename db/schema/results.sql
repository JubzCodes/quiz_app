CREATE TABLE results (
id SERIAL PRIMARY KEY,
quiz_id  INTEGER REFERENCES quiz(id),
result BOOLEAN,
name VARCHAR(255),
results_url VARCHAR(255)
);
