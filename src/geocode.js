
const request = require("request")


const geocode = (address, callback)=>{

    

        const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibWVkaGF0aGFtIiwiYSI6ImNsa2YzeGx1ZzB1dHMzY3FqYmZtNjMwMngifQ.5R5khneu-Hn-66R2oDPNGg"
    
        request({ url : geocodeUrl , json : true} , (error , response)=>{
    
            if(error){
        
                callback("Error cannot connect website " , undefined)
    
            }
            else if(response.body.message){
    
                callback(response.body.message , undefined)
            }
            else if(response.body.features.length == 0){
    
                callback("Error in location" , undefined)
    
            }
            else{
                callback(undefined , {
                    longtitude : response.body.features[0].center[0],
                    latitude : response.body.features[0].center[1]
                })
            }
        })

    }
    

module.exports = geocode ;
