
const request = require ('request')

const forecast = (longtitude , latitude , callback ) => {

  const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q=" + longtitude + "," + latitude
  
  request ({url, json : true} , (error , response) => {
       
      if(error) {
           callback ("Unable to connect weather service" , undefined)
      } else if(response.body.error){
           callback (response.body.error.message , undefined)
      } else {
              callback (undefined , {
                name : response.body.location.name ,
                longtitude : longtitude ,
                latitude :  latitude ,
                status :  response.body.current.condition.text ,
                temp : response.body.current.temp_c 
              } )
      }
  })
  }

module.exports = forecast;
