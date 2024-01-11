const { db } = require('../util/mysql');

// 登录
exports.getUsername = async(username) => {
  let data = await db('select * from user where username = ?;', [username]);
  return data;
}

// 展示图书信息+检索
exports.getBook = async(pageNumber, pageSize) => {
  let data = await db('select * from book limit ? offset ?;', [pageSize, pageNumber]);
  return data;
}

// 借书
exports.borrowBook = async(bno, sno) => {
  let result = await db('insert into borrow(BSno, BSname) values (?, ?);', [bno, sno]);
  let result2 = await db('update book set Bnum = ? where Bno = ?', [0, bno]);
  return result;
}

// 还书
exports.returnBook = async(bno) => {
  let result = await db('update book set Bnum = ? where Bno = ?', [1, bno]);
  let result2 = await db('update borrow set Bnum = ? where Bno = ?', [1, bno]);
  return result;
}