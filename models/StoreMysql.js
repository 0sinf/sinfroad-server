const conn = require('../config/db');

exports.findAll = () => {
  conn.query(`SELECT * FROM store`, (err, stores) => {
    if (err) throw err;
    return stores;
  })
}

exports.save = (data) => {
  conn.query(`SELECT * FROM store WHERE id=?`, [data.id], (err, store) => {
    if (err) throw err;
    if (!store) {
      // store가 없는 경우 저장
      conn.query(`INSERT INTO store(name, review, addr, part) VALUES (${data.name}, ${data.review}, ${data.addr}, ${data.part})`, (err2, result) => {
        if (err2) throw err2;
        return result.insertId;
      })
    }
    else {
      // store가 있는 경우 업데이트
      conn.query(
        `UPDATE store SET name=?, review=?, addr=?, part=?`, 
        [data.name, data.review, data.addr, data.part], 
        (err2, result) => {
          if (err2) throw err2;
          return result.id;
        }
      )
    }
  })
}

exports.findOne = (id) => {
  conn.query(`SELECT * FROM stroe WHERE id=?`, [id], (err, store) => {
    if (err) throw err;
    return store;
  })
}

exports.remove = (id) => {
  conn.query(`DELETE FROM store WHERE id=?`, [id], (err, result) => {
    if (err) throw err;
    return result;
  })
}

exports.findByName = (search) => {
  conn.query(`SELECT * FROM store WHERE name=?`, [search], (err, store) => {
    if (err) throw err;
    return store;
  })
}