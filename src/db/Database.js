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
      () => console.log('Subject table created Successfully'),
      (txObj, error) => console.log('Error creating subject table:', error),
    );
  });
};

export const insertCourses = (name, fees, success, error) => {
  db.transaction(tx => {
    // Check if course already exists
    tx.executeSql(
      'SELECT * FROM courses WHERE name=?',
      [name],
      (_, { rows }) => {
        if (rows.length > 0) {
          // Course already exists
          error("Course Already Exist");
        } else {
          // Insert new course
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
            }
          );
        }
      },
      (_, err) => {
        console.log('Select Error:', err);
        error(err);
      }
      
      
     );
  },
  err => {
    // Transaction error
    console.log('Transaction Error:', err);
    error(err);
  });
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

export const deleteCourse = (id, success, error) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM courses where id=?',
      [id],
      res => {
        success(res);
      },
      err => {
        error(err);
      },
    );
  });
};



export const updateCourse = (id, newName, newFees, success, error) => {
  db.transaction(tx => {
    // Check if another course with the same name exists
    tx.executeSql(
      "SELECT * FROM courses WHERE name=? AND id!=?",
      [newName, id],
      (_, { rows }) => {
        if (rows.length > 0 || rows._array.length > 0) {
          error("Course with this name already exists");
        } else {
          // Proceed to update
          tx.executeSql(
            "UPDATE courses SET name=?, fees=? WHERE id=?",
            [newName, newFees, id],
            (_, res) => {
              success(res);
            },
            (_, err) => {
              console.log("Update error:", err);
              error("Error while updating course", err);
            }
          );
        }
      },
      (_, err) => {
        console.log("Select error:", err);
        error("Error while checking existing course", err);
      }
    );
  },
  (err) => {
    console.log("Transaction error:", err);
    error("Transaction failed", err);
  });
};

