// const db = require('../util/mysql')
const userModel = require('../Model/userModel');
// const bodyParser = require('body-parser');
// const express = require('express');

// 登录接口
exports.handleLogin = async(req, res) => {
  let { username, password } = req.query;
  let data = await userModel.getUsername(username);
  console.log(data);
  let {uname, psd} = data;
  if (!username && !password) {
    res.json({
      code: "A0102",
      msg: "用户名或密码不能为空"
    });
    return;
  }
  if (data.length === 0) {
    res.json({
      code: "A0102",
      msg: "用户名或者密码错误"
    });
    return;
  }
  if (username === uname && password === psd) {
    req.session.userInfo = { username, password };
    res.json({
      success: true,
      code: "A0103",
      msg: "登录成功"
    });
  } else {
    req.session.destroy();
    res.json({
      code: "A0102",
      msg: "用户名或者密码错误"
    });
    return;
  }
}

// 图书检索接口
exports.handleBookShow = async(req, res) => {
  // console.log(req.query);
  let {pageSize, pageNumber, text} = req.query;
  let data = await userModel.getBook(pageNumber, pageSize);
  // console.log(data);
  if (data.length === 0) {
    res.json({
      code: "A0106",
      msg: "查询不到结果"
    });
    return;
  }
  if (text) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].Bname);
      const name = data[i].Bname;
      if (name.includes(text)) {
        result.push(data[i]);
      }
    }
    console.log(result);
    if (result.length !== 0) {
      res.json({
        code: 'A0105',
        msg: "图书信息加载完毕",
        data: {
          result
        }
      });
    } else {
      res.json({
        code: 'A0106',
        msg: '查询不到结果'
      });
    }
    return;
  }
  res.json({
    code: "A0105",
    msg: "图书信息加载完毕",
    data: {
      data
    }
  });
}

// 借书接口
exports.handleBookBorrow = async(req, res) => {
  let {bno, sno} = req.query;
  // console.log(bno, sno);
  // const borrowTime = Date.now();
  // console.log(borrowTime);
  let result = await userModel.borrowBook(bno, sno);
  console.log(result);
  res.json({
    code: "A0107",
    msg: "借书成功"
  });
}

// 还书接口
exports.handleBookReturn = async(req, res) => {
  let { bno } = req.query;
  let result = await userModel.returnBook(bno);
  res.json({
    code: "A0108",
    msg: "还书成功"
  })
}