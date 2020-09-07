const admin = require('firebase-admin');
admin.initializeApp();
const database = admin.firestore();
exports.UniversityData = (req, res) => {
    
          
          let Details = {
            "uid":req.body.UID,
            "Uniname": req.body.Uniname,
            "email":req.body.email,
            "regDate":req.body.registrationDate,
            "ExpiryDate":req.body.expirydate,
            "imgurl":req.body.imageUrl,
            "students":req.body.Students,
            "ContactNo":req.body.contact,
            "weburl":req.body.weburl
          }
          database.collection('universityDetails').add(Details).then(ref => {
           
            res.status(201).send("store");
            return Details;
          }).catch((err) => {
            res.status(err.code).json({
              message: `Something worng. $(error.message)`
            })
          })
    
}

exports.getUniversityDetails=(req,res)=>{
      let universitydatas=[]
      database.collection('universityDetails').get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
          const info=doc.data()
          //const id=doc.id
          universitydatas.push({
            id:doc.id,
            info
          });
        });
        res.status(200).json(universitydatas)
        return null;

      }).catch((error) => {
        console.log(error);
        res.status(200).send(error)
      })
}

exports.getUniversityDetailsById=(req,res)=>{
        
    database.collection('universityDetails').doc(req.params.item_id).get()
    .then(responses=>{
        res.status(200).send(responses.data());
        return 0;
    })
    .catch((error) => {
        console.log(error);
        res.status(200).send(error)
      })
}
exports.UpdateUniversityDetails= (req,res)=>{
    
    let details={
        uid:req.body.uid,
        Uniname: req.body.Uniname,
        email:req.body.email,
        regDate:req.body.regDate,
        ExpiryDate:req.body.ExpiryDate,
        imgurl:req.body.imgurl,
        students:req.body.students,
        ContactNo:req.body.ContactNo,
        weburl:req.body.weburl
    }
    database.collection('universityDetails').doc(`${req.params.item_id}`).update(details)
    .then(r=>{
        res.status(200).send("updated");
        return null
    })
    .catch((err) => {
        res.status(err.code).json({
          message: `Something worng. $(error.message)`
        })
      })

 }

exports.deleteUniversityDetails=(req,res)=>{
   
    database.collection('universityDetails').doc(req.params._id).delete()
      .then(()=>res.status(204).send("Document successfully deleted!"))
      .catch((error) =>{
              res.status(500).send(error);
      });
    }