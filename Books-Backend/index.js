const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
const mysql=require("mysql");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


const db=mysql.createPool({
host: "localhost",
user: "root",
password: "1234",
database: "bookscatologue",
port: 3306,
});
app.post("/api/machineModel",(req,res)=>{
    const isbn=req.body.isbn;
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["app1.py", isbn]);
    pythonProcess.stdout.on('data', (data) => {
        res.send(data);
    });
});
app.post("/api/getDetails",(req,res)=>{
    const id=req.body.ide;
    const sqlSelect="select * from my_table where id=?";
    db.query(sqlSelect,[id],(error,result)=>{
        
        res.send(result);
    });
});
app.post("/api/getspecificDetails",(req,res)=>{
    const bookid=req.body.booki;
    const id=req.body.id;
    // console.log(id+" "+bookid);
    const mySql="select * from my_table where id=? and bookiid=?";
    db.query(mySql,[id,bookid],(error,response)=>{
        // console.log(error);
        res.send(response);
        
    });
});
app.post("/api/update",(req,res)=>{
    const bookid=req.body.bookid;
    const status=req.body.status;
    const rating=req.body.rating;
    const notes=req.body.notes;
    const readgain=req.body.readgain;
    const pagefinsh=req.body.pagefinsh;
    const id=req.body.ide;
    const mySql="update my_table set status=?,rating=?,notes=?,readgain=?,pagefinsh=? where bookiid=? and id=?";
    db.query(mySql,[status,rating,notes,readgain,pagefinsh,bookid,id],(error,response)=>{
        res.send(response);
        console.log(error);
    });
});
app.post("/api/insert",(req,res)=>{
    //const bookid=req.body.bookid;
    const bookname=req.body.bookname;
    const bookdes=req.body.bookd;
    const bookauthor=req.body.bookauthor;
    const bookthumb=req.body.booktumbnail;
    const bookid=req.body.bookid;
    const id=req.body.id;
    const sqlInsert="insert into my_Table(id,bookname,bookdes,bookauthor,bookthumb,bookiid) values(?,?,?,?,?,?)";
    db.query(sqlInsert,[id,bookname,bookdes,bookauthor,bookthumb,bookid],(error,result) =>{
        console.log(error);
        res.send(result);
    });
})
app.post("/api/insertuser",(req,res)=>{
    //const bookid=req.body.bookid;
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password;

    // console.log(fname+" "+lname+" "+email+" "+password);
    const sqlInsert="insert into users(id,username,email,password) values(?,?,?,?)";
    db.query(sqlInsert,[email,fname,email,password],(error,result) =>{
        res.send(result);
    });
})
app.post("/api/finduser",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const mySql="select count(username) as c,username,id,email,password from users where email=? and password=? ";
    db.query(mySql,[email,password],(error,response)=>{
        res.send(response);
    });
});
app.listen(3001,()=>{
    console.log("Started at locolhost 3001");
});