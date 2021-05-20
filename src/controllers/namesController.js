const axios = require('axios');
const db = require('./databaseController')


/**
 * Save names with info into mysql database
 * @param {*} namesResult array of objects 
 */
const saveNamesResult = async(namesResult)=>{
    let sql = "insert into names(name,country,age,gender)values ?"
    let values = []
    namesResult.forEach(element=>{
        values.push([element.name, element.country, element.age, element.gender])
    })
    db.query(sql,[values],(err,result)=>{
        if(err) throw err;
        //console.log(result)
    })
} 
/**
 * Takes an array an returns a string as param
 * @param {*} names array of names
 * @returns returns a param string 
 */
const castToParamFormat = async(names)=>{
    let params = '';
    names.forEach(element => {
        params = params + 'name='+element+'&'
    });
    return params.slice(0,params.length-1);
}
/**
 * Get x random names from api
 * @param {*} num number of names to get from api
 * @returns list of randomly generated names 
 */
const getNames = async (num)=>{
    try{
        let response = await axios.get('https://namey.muffinlabs.com/name.json?',{params:{
            count: num,
            with_surname: false,
            frequency: 'all'
        }})
        return response.data;
    }catch(error){
        console.error(error);
        throw error;
    }
}
/**
 * Takes string param as names and execute a request api
 * @param {*} params string of params names
 * @returns list of objets from api
 */
const getGenderAPI = async(params)=>{
    try{
        let response = await axios.get(`https://api.genderize.io/?${params}`)
        return Array.isArray(response.data) ? response.data : [response.data];
    }catch(error){
        console.error(error);
        throw error;
    }
}
/**
 * Takes string param as names and execute a request api
 * @param {*} params string of params names
 * @returns list of objets from api
 */
const getAgeAPI = async(params)=>{
    try{
        let response = await axios.get(`https://api.agify.io/?${params}`)
        return Array.isArray(response.data) ? response.data : [response.data];
    }catch(error){
        console.error(error);
        throw error;
    }
}
/**
 * Takes string param as names and execute a request api
 * @param {*} params string of params names
 * @returns list of objets from api
 */
const getNationalityAPI = async(params)=>{
    try{
        let response = await axios.get(`https://api.nationalize.io/?${params}`)
        return Array.isArray(response.data) ? response.data : [response.data];
    }catch(error){
        console.error(error);
        throw error;
    }
}

exports.saveNamesResult   = saveNamesResult;
exports.castToParamFormat = castToParamFormat;
exports.getNames          = getNames;
exports.getGenderAPI      = getGenderAPI;
exports.getAgeAPI         = getAgeAPI;
exports.getNationalityAPI = getNationalityAPI;