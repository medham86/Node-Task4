
const express = require('express') ;
const app = express() ;
const port = process.env.PORT || 3000 ;

const path = require('path') ;
const publicDirectory = path.join(__dirname , '../public');
app.use(express.static(publicDirectory));


app.set("view engine" , "hbs") ;

const viewDirectory = path.join(__dirname , '../temp1/views');
app.set('views' , viewDirectory);

const hbs = require('hbs');
const partialsDirectory = path.join(__dirname , '../temp1/partials');
hbs.registerPartials(partialsDirectory);

app.get('/' , ( req , res )=>{
    res.render('index' , {

        title : 'Welcome in my Home Page',
        name : 'Medhat' ,
        age : 37 ,
        city : 'Fayoum'
    })
})


const geocode = require('../src/geocode')
const forecast  = require ("../src/forecast")

    

app.get('/weather' , ( req , res )=>{
    
    const address = req.query.address ;

    geocode(address,(error , data)=>{
        

        if(data){
            forecast( data.longtitude , data.latitude , (error , data)=>{
                res.render('weather' , {
                    title : "Weather Page" ,
                    name: data.name,
                    longtitude : data.longtitude,
                    latitude : data.latitude,
                    status:  data.status,
                    temp : data.temp,
                })

                
            })
        }else{
            console.log(error)
        }
    
})

    
})
           


app.listen(port , ()=>{console.log(`Everything is ok on port : ${port}`)});