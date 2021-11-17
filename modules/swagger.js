const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = { 
    swaggerDefinition: { 
        info: { 
            title: 'Test API - stock', 
            version: '1.0.0', 
            description: 'Test API with express', 
        }, 
        host: 'localhost:3000', 
        basePath: '/' 
    }, 
    apis: ['../api-doc/**/*.yaml] 
}; 
//swaggerDefinition은 yaml이나 json형식 받음. 위는 json형식
//apis는 내가 설정한 api들을 swagger가 찾을 수 있도록 표시해줍니다.
// "/routes 파일 아래 js 파일 내에 정의하고 있으며, /swagger 폴더 아래 swagger 설정을 정의하고 있다"를 명시해준 것입니다.

const swaggerspecs = swaggereJsdoc(options); 

module.exports = { swaggerUi, swaggerspecs };

