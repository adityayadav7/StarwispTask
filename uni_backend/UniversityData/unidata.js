var  database=require('../config/config')
exports.UniversityData = (req, res) => {
          let Details = {
            Uniname: req.body.Uniname,
            email:req.body.email,
            regDate:req.body.regDate,
            ExpiryDate:req.body.ExpiryDate,
            imgurl:req.body.imgurl,
            students:req.body.students,
            ContactNo:req.body.ContactNo,
            weburl:req.body.weburl
          }
          database.query('INSERT INTO uni_details  SET ?',Details,function(err,result){
            if(err){
                console.log(err)
            }
            else{
                 console.log(result.insertId);
                 res.json({error:false,message:" added successfully!",data:result.data});
            }
        })
    
}

exports.getUniversityDetails=(req,res)=>{
      
      database.query('SELECT * FROM uni_details',function (err, result) {
        if(err) {
            console.log("error: ", err);
            res.status(200).json(err)
        }
        else{
            console.log('employees : ', result);
            res.status(200).json(result)
        }
    }
      )
}

exports.getUniversityDetailsById=(req,res)=>{
        
  database.query('SELECT * FROM uni_details WHERE uid=?',req.params.id,function(err,result){
    if(err){
        console.log(err)
        result(err,null)
    }
    else{
        res.status(200).send(result);
    }
})
}
exports.UpdateUniversityDetails= (req,res)=>{
    
    let details={
      Uniname: req.body.Uniname,
      email:req.body.email,
      regDate:req.body.regDate,
      ExpiryDate:req.body.ExpiryDate,
      imgurl:req.body.imgurl,
      students:req.body.students,
      ContactNo:req.body.ContactNo,
      weburl:req.body.weburl
    }
    database.query('UPDATE uni_details SET Uniname=?,email=?,regDate=?,ExpiryDate=?,imgurl=?,students=?,ContactNo=?,weburl=? where uid=?',
    [details.Uniname,details.email,details.regDate,details.ExpiryDate,details.imgurl,details.students,details.ContactNo,details.weburl,req.params.id],
    function(err,result){
        if(err){
            console.log(err);
        }
        else{
          res.status(200).send(result); 
        }
    })

 }

exports.deleteUniversityDetails=(req,res)=>{
   
  database.query('DELETE FROM uni_details WHERE uid=?',[req.params.id],
  function(err,result){
   if(err){
       console.log(err);
   }
   else{
    res.status(204).send("successfully deleted!") 
   }
})
    }

exports.login=(req,res)=>{
  let newUser={
    user_id:req.body.user_id,
    password:req.body.password
  }
  database.query('SELECT * FROM login WHERE user_id=?',[newUser.user_id],function(err,result){
    if(err){
        console.log(err)
    }
    else{
        if(result.length>0){
            if(newUser.password==result[0].password){
                res.send({
                  "success":"login"
                })
                
            }
            else{
                
                res.status(200).json(err)
            }
        }
        else{
          
          res.status(200).json(err)
        }
       
    }
})
}

// exports.getUserId=(req,res)=>{
//   database.query('SELECT user_id FROM login where')
// }