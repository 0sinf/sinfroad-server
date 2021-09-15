const conn = require('../config/db');

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM store`, (err, stores) => {
      if (err) reject(err);
      // console.log(stores);
      resolve(stores);
    })
  });
}

exports.save = (data) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM store WHERE id=?`, [data.id], (err, store) => {
      if (err) reject(err);
      console.log(store);
      if (!store[0]) {
        // store가 없는 경우 저장
        conn.query(
          `INSERT INTO store(name, review, addr, part, nLink) VALUES (?, ?, ?, ?, ?)`,
          [data.name, data.review, data.addr, data.part, data.nLink], (err2, result) => {
          if (err2) reject(err2);
          resolve(result.insertId);
        })
      }
      else {
        // store가 있는 경우 업데이트
        conn.query(
          `UPDATE store SET name=?, review=?, addr=?, part=?, nLink=? WHERE id=?`, 
          [data.name, data.review, data.addr, data.part, data.nLink, data.id], 
          (err2, result) => {
            if (err2) reject(err2);
            resolve(result.id);
          }
        )
      }
    })
  })
  
}

exports.findOne = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM store WHERE id=?`, [id], (err, store) => {
      if (err) reject(err);
      resolve(store[0]);
    })
  })
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM store WHERE id=?`, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}

exports.findByName = (search) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM store WHERE name=?`, [search], (err, store) => {
      if (err) reject(err);
      resolve(store[0]);
    })
  })
}

exports.findByPart = function(part) {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM store WHERE part=?`, [part], (err, stores) => {
      if (err) reject(err);
      resolve(stores)
    })
  })
}