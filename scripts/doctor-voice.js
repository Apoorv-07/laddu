const { diagnoseVoicebox } = require('../electron/services');
(async()=>{const result=await diagnoseVoicebox(); console.log(JSON.stringify(result,null,2));})();
