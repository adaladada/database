// const db = require('../util/mysql')
const userModel = require('../Model/userModel');
// const bodyParser = require('body-parser');
// const express = require('express');

// 登录接口
exports.handleLogin = async(req, res) => {
  let { username, password } = req.body;
  let data = await userModel.getUsername(username, password);
  console.log(username, password);
  // console.log(uname, psd);
  if (!username && !password) {
    res.json({
      code: "A0102",
      msg: "用户名或密码不能为空",
      data: {
        status: false
      }
    });
    return;
  }
  if (data.length === 0) {
    res.json({
      code: "A0102",
      msg: "用户名或者密码错误",
      data: {
        status: false
      }
    });
    return;
  }
  let uname = data[0].username;
  let psd = data[0].password;
  if (username === uname && password === psd) {
    req.session.userInfo = { username, password };
    console.log("登录成功");
    res.json({
      code: "A0103",
      msg: "登录成功",
      data: {
        status: true
      }
    });
  } else {
    req.session.destroy();
    res.json({
      code: "A0102",
      msg: "用户名或者密码错误",
      success: false,

    });
    return;
  }
}

// 图书检索接口
exports.handleBookShow = async(req, res) => {
  // console.log(req.query);
  let {pageSize, pageNumber, text} = req.body;
  // console.log(req.body);
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
  let {bno, sno} = req.body;
  // console.log(bno, sno);
  // const borrowTime = Date.now();
  // console.log(borrowTime);
  let result = await userModel.borrowBook(bno, sno);
  // console.log(result);
  res.json({
    code: "A0107",
    msg: "借书成功",
    data: {
      result
    }
  });
}

// 还书接口
exports.handleBookReturn = async(req, res) => {
  let { bno } = req.body;
  const returnTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().slice(0, 19).replace('T', ' ');
  let result = await userModel.returnBook(returnTime, bno);
  // console.log(result);
  res.json({
    code: "A0108",
    msg: "还书成功",
    data: {
      result
    }
  })
}

// 展示归还图书
exports.handleBookReturnShow = async(req, res)=> {
  let { sno } = req.body;
  let data = await userModel.showReturnBook(sno);
  console.log(data);
  res.json({
    code: "A0110",
    msg: "信息获取成功",
    data: {
      data
    }
  });
}