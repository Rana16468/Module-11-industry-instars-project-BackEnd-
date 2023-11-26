import  mongoose  from 'mongoose';
import app from './app';
import config from './app/config';



async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/test');
    try {
        await mongoose.connect(config.database_url as string);
        console.log('successfully run');
        app.listen(config.port, () => {
          console.log(`Example app listening on port ${config.port}`);
        });
      } catch (err) {
        console.log(err);
      }
    
    }
    main().then(()=>{}).catch((error)=>{
        console.log(error);
    })
    