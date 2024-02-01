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
  let result = await db('select * from borrow where BSno = ? and BSname = ?', [bno, sno]);
  // console.log(result);
  if (result.length !== 0) {
    return "borrowed";
  }
  let result2 = await db('insert into borrow(BSno, BSname) values (?, ?);', [bno, sno]);
  let result3 = await db('update book set Bnum = ? where Bno = ?', [0, bno]);
  let result4 = await db('select * from borrow where BSno = ? and BSname = ?', [bno, sno]);
  return result4;
}

// 还书
exports.returnBook = async(returnTime, bno) => {
  let result2 = await db('update book set Bnum = ? where Bno = ?', [1, bno]);
  let result3 = await db('update borrow set returnTime = ? where BSno = ?;', [returnTime, bno]);
  return result2;
}

// 记录
exports.showReturnBook = async(sno) => {
  let result2 = await db('select * from borrow where BSname = ?', [sno]);
  return result2;
}