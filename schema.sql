CREATE TABLE numbers (
  id SERIAL PRIMARY KEY,
  number INTEGER NOT NULL
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  class VARCHAR(50) NOT NULL,
  grade INTEGER NOT NULL,
  CONSTRAINT valid_grade CHECK (grade >= 0 AND grade <= 100),
  CONSTRAINT valid_class CHECK (class IN ('Math', 'Science', 'History'))
);