import  mongoose  from 'mongoose';
import app from './app';
import config from './app/config';
import {Server} from 'http';
import seedSuperAdmin from './app/DB';
//username: ph-university
//password: 03jeL0DfYssJP658

let server:Server;

async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/test');
    try {
        await mongoose.connect(config.database_url as string);
        seedSuperAdmin();
        console.log('successfully run');
        server= app.listen(config.port, () => {
          console.log(`Example app listening on port ${config.port}`);
        });
      } catch (err) {
        console.log(err);
      }
    
    }
    main();
    
// server unhandel rejection
    process.on('unhandledRejection',()=>{

     if(server)
     {
      server.close(()=>{
        process.exit(1);
      })
     }
     process.exit(1);
    });
    // uncaught Exception ---> human undefine or Human error
    process.on('uncaughtException',()=>{
     process.exit(1);
    })

  