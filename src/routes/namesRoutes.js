const Router = require('express');
const namesController = require('../controllers/namesController')
const router = Router();

router.get('/getNames',async (req,res)=>{
    namesController.getNames(10).then(
        data=>{
            data.push('Josue')//agrego mi nombre como indica el enunciado
            //estas API solo permiten la consulta para hasta un maximo de 10 nombres, por ende se decide realizar por bloques de 10 para maximo rendimiento
            let requestLoad = []
            for (let i = 0; i < data.length; i+=10) {
                requestLoad.push(data.slice(i, i + 10));
            }
            let namesInfo = []
            for(let i=0; i<requestLoad.length; i++){
                namesController.castToParamFormat(requestLoad[i])
                .then(result =>{
                    Promise.all([namesController.getGenderAPI(result),namesController.getAgeAPI(result),namesController.getNationalityAPI(result)]).then(([gender,age,nationality])=>{
                        for(let y = 0; y < requestLoad[i].length; y++){
                            namesInfo.push({name:requestLoad[i][y], 
                                            country:    nationality[y].country.length != 0 ? nationality[y].country[0].country_id : null, //algunos nombres en la api de paises no retornan resultados 
                                            age:        age[y].age, 
                                            gender:     gender[y].gender})
                        }
                        console.log(namesInfo)
                        namesController.saveNamesResult(namesInfo)
                    })
                });
            }
            res.status(200).send('Consulta existosa');
        }
    )
})


module.exports = router;