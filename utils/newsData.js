const constants = require('../config');
const request = require('request')

const newsData=(callback)=>{
    const url=constants.newAPI.BASE_URL+constants.newAPI.SECRET_KEY
    request({url,json:true},(error,data)=>{
        if(error){
            callback('Unable to load data please check your internet connections',undefined)
            console.log(error)
        }else if(!data){
            callback('no updates avialable',undefined)
        }else{
            callback(undefined,{
                articles:data.body.articles
            })
        }
    })
}

module.exports=newsData;