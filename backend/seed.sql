-- --------------------------------------------------------
-- 1. Insert Subjects
-- --------------------------------------------------------
INSERT INTO Subjects (subject_id, subject_name, max_marks) VALUES
(1, 'Mathematics', 100),
(2, 'Physics', 100),
(3, 'Chemistry', 100),
(4, 'Computer Science', 100),
(5, 'English', 100);

-- --------------------------------------------------------
-- 2. Insert Students (10 students)
-- --------------------------------------------------------
INSERT INTO Students (student_id, name, roll_no, course, semester) VALUES
(1, 'Alice Smith', 'CS1001', 'B.Tech CS', 3),
(2, 'Bob Johnson', 'CS1002', 'B.Tech CS', 3),
(3, 'Charlie Brown', 'CS1003', 'B.Tech CS', 3),
(4, 'Diana Prince', 'CS1004', 'B.Tech CS', 3),
(5, 'Ethan Hunt', 'CS1005', 'B.Tech CS', 3),
(6, 'Fiona Gallagher', 'CS1006', 'B.Tech CS', 3),
(7, 'George Miller', 'CS1007', 'B.Tech CS', 3),
(8, 'Hannah Abbott', 'CS1008', 'B.Tech CS', 3),
(9, 'Ian Wright', 'CS1009', 'B.Tech CS', 3),
(10, 'Julia Roberts', 'CS1010', 'B.Tech CS', 3);

-- --------------------------------------------------------
-- 3. Insert Marks (50 records: 10 students * 5 subjects)
-- --------------------------------------------------------

-- TOPPERS (Consistently high scores > 90%)
-- Alice Smith (Overall Topper)
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(1, 1, 98.00), (1, 2, 95.00), (1, 3, 92.50), (1, 4, 99.00), (1, 5, 88.00); 

-- Bob Johnson (Second Topper)
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(2, 1, 91.00), (2, 2, 89.50), (2, 3, 94.00), (2, 4, 96.50), (2, 5, 90.00); 


-- AVERAGE STUDENTS (Scores ranging between 55% - 85%)
-- Charlie Brown
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(3, 1, 75.00), (3, 2, 68.00), (3, 3, 72.00), (3, 4, 80.50), (3, 5, 65.00);

-- Diana Prince
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(4, 1, 62.00), (4, 2, 70.50), (4, 3, 65.00), (4, 4, 75.00), (4, 5, 82.00);

-- Ethan Hunt
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(5, 1, 80.00), (5, 2, 75.00), (5, 3, 70.00), (5, 4, 85.50), (5, 5, 78.00);

-- Fiona Gallagher
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(6, 1, 55.00), (6, 2, 60.00), (6, 3, 58.00), (6, 4, 65.00), (6, 5, 70.00);


-- FAILING STUDENTS (Multiple scores < 40%)
-- George Miller (Failed 3 subjects)
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(7, 1, 30.00), (7, 2, 25.00), (7, 3, 35.00), (7, 4, 40.00), (7, 5, 45.00);

-- Hannah Abbott (Failed all subjects)
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(8, 1, 20.00), (8, 2, 15.00), (8, 3, 18.00), (8, 4, 25.00), (8, 5, 30.00);


-- MIXED PERFORMANCE STUDENTS
-- Ian Wright (Struggles in some, excels in others)
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(9, 1, 45.00), (9, 2, 85.00), (9, 3, 50.00), (9, 4, 90.00), (9, 5, 60.00);

-- Julia Roberts 
INSERT INTO Marks (student_id, subject_id, marks_obtained) VALUES
(10, 1, 88.00), (10, 2, 40.00), (10, 3, 85.00), (10, 4, 45.00), (10, 5, 95.00);
