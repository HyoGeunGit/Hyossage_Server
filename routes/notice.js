module.exports = notice;

function notice(app, Message, rndstring){
    app.post('/message/maxchk', async(req,res)=>{
        let result = await Message.find();
        if ( parseInt(req.body.docNum) == result.length){
            return res.status(200).json(true)
        }
        else{
           return res.status(200).json(false)
        }
    })
    app.post('/message/write', async(req,res)=>{
        var today = new Date();
        var hh = today.getHours();
        var nn = today.getMinutes(); 
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 
        today = yyyy+"년"+mm+"월"+dd+"일 "+hh+"시"+nn+"분";
        var messages = new Message(req.body);
        let listNum = await Message.find()
        listNum = listNum.length;
        messages.docNum = listNum + 1;
        messages.token =  rndstring.generate(23);
        messages.nowDate = today;
        if(req.body.phone == null || req.body.phone == 0 || req.body.phone == ""){
            messages.phone = "애플리케이션이 강제종료된 흔적이 있습니다. 주의해주세요"
        }
        if(req.body.data == null || req.body.data == ""){
            messages.data = "애플리케이션이 강제종료된 흔적이 있습니다. 주의해주세요"
        }
        var result = await messages.save();    
        if(!result.ok) res.status(200).json(messages);
        else res.status(500).json({message : "fail!"});
    })
    // length - (page - 1 ) * 10 부터 length - page * 10 까지 findOne으로 10개씩 찾아서 list에 push
    app.post('/message/read', async(req,res)=>{
        let result = await Message.find().sort({ docNum : -1 });
        let list = []
        for (var i=0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                token : result[i].token
            }

            list.push(json)
        }
        return res.status(200).json({list : list})
    })

    app.post('/message/search/:userToken', async(req,res)=>{
        let result = await Message.find({userToken : req.body.userToken}).sort({docNum : -1})
        let list = []
        for( var i = 0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                token : result[i].token
            }
            list.push(json)
        }
        return res.status(200).json(list)
    })
    app.post('/message/searchPhone', async(req,res)=>{
        let result = await Message.find({userToken : req.body.userToken, phone:req.body.phone}).sort({docNum : -1})
        let list = []
        for( var i = 0; result[i] != null; i++) {
            let json = {
                phone : result[i].phone,
                data : result[i].data,
                token : result[i].token
            }
            list.push(json)
        }
        return res.status(200).json( list )
    })

}
