import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// ✅ Open or Create the Database
const db = SQLite.openDatabase(
  {
    name: 'studentapp.db',
    location: 'default',
  },
  () => {
    Alert.alert('Database Created Successfully');
  },
  error => {
    Alert.alert('Error Occurred', JSON.stringify(error));
  },
);

// ✅ Create Tables
export const initDB = () => {
  db.transaction(tx => {
    // Create courses table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS courses ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        fees INTEGER
      );`,
      [],
      () => console.log('Courses table created'),
      (txObj, error) => console.log('Error creating courses table:', error),
    );

    // Create subject table with foreign key reference
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS subject ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        course_id INTEGER,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      );`,
      [],
      () => console.log('Subject table created'),
      (txObj, error) => console.log('Error creating subject table:', error),
    );
  });
};

// ✅ Insert Data into Courses Table
export const insertCourses = (name, fees, success, error) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO courses (name, fees) VALUES (?, ?)',
        [name, fees],
        (_, res) => {
          console.log('Insert Success:', res);
          success(res);
        },
        (_, err) => {
          console.log('Insert Error:', err);
          error(err);
        },
      );
    },
    err => {
      console.log('Transaction Error:', err);
      error(err);
    },
  );
};

export const getCourses = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM courses', [], (_, { rows }) => {
      const result = [];
      for (let i = 0; i < rows.length; i++) {
        result.push(rows.item(i));
      }
      callback(result);
    });
  });
};
