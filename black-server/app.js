const express = require("express");
const mysql = require("mysql");
const pool = require("./pool");
var app = express();
app.use(express.static(__dirname+"/public"));

//解决跨域问题
const cors=require("cors")
app.use(cors({
    origin:["*"],
    credentials:true
}));

console.log("5000")
app.listen(5000);
//首页新闻
app.get("/indexw",(req,res)=>{
var sql = "SELECT `xid`, `a`, `img`, `bt`, `zan`, `view` FROM `indexw`";
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         res.send(result);
    });
});

//新闻详情跳转
app.get("/xwdetail",(req,res)=>{
var xid=req.query.xid;
var sql = "SELECT `bt`, `bt1`, `time`, `im1`, `im2`, `im3`, `text1`, `text2`, `text3` FROM `xwdetails` WHERE xid=?";
    pool.query(sql,xid,(err,result)=>{
         if(err)throw err;
         res.send(result);
    });
});

//评论列表下拉加载更多
app.get("/cri",(req,res)=>{
	var xid=req.query.xid;
	var pno=req.query.pno;
	var obj={};
	//创建变量保存sql语句完成的进度
	var progress=0;
	var sql="select count(cid) c from cri where xid = ?";
    pool.query(sql,xid,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].c/4);//总页数
        obj.pageCount=pageCount;
        progress+=50;
        if(progress==100) {
            res.send(obj);
        }
    });
	var sql = "SELECT `cid`, `image`, `name`, `time`, `content` FROM `cri` where xid = ? limit ?,4";
	var offset=parseInt((pno-1)*4);;
    pool.query(sql,[xid,offset],(err,result)=>{
         if(err)throw err;
		 obj.data=result;
         progress+=50;
         if(progress==100) {
            res.send(obj);
         }
    });
});
//添加评论
app.get("/add",(req,res)=>{
var xid=req.query.xid;
var content=req.query.content;
var sql = "INSERT INTO `cri`(`cid`, `xid`, `image`, `name`, `time`, `content`) VALUES (null,?,'http://127.0.0.1:5000/img/logo.png','匿名用户','2018-4-03   15:15',?)";
    pool.query(sql,[xid,content],(err,result)=>{
		if(err)throw err;
		res.send({msg:"评论成功"});
	});
});
//点赞功能
app.get("/zan",(req,res)=>{
    var zan=req.query.zan;
    var xid=req.query.xid;
    var sql="UPDATE `indexw` SET `zan` = ? WHERE `xid` = ?";
    pool.query(sql,[zan,xid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==1)res.send({code:1,msg:"赞+1"});
        else res.send({code:-1,msg:"未知错误!"});
    })
});
//精选简介
app.get("/jxxw",(req,res)=>{
var sql = "SELECT `jxid`,`img`, `bt`, `zan`, `view` FROM `jxxw`";
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         res.send(result);
    });
});
//精选详情跳转
app.get("/jxdetail",(req,res)=>{
var jxid=req.query.jxid;
var sql = "SELECT `jxid`, `author`, `article`, `img` FROM `jxdetails` WHERE jxid=?";
    pool.query(sql,jxid,(err,result)=>{
         if(err)throw err;
         res.send(result);
    });
});

//关注
app.get("/fans",(req,res)=>{
var sql = "SELECT `fid`, `img`, `name`, `gz` FROM `fans`";
    pool.query(sql,(err,result)=>{
         if(err)throw err;
         res.send(result);
    });
});