 
 
 const http=require('http');
 const path=require('path');
 const fs=require('fs');

 const server=http.createServer((req,res)=>{
    if(req.url.startsWith('/public/')){
        const filePath=path.join(__dirname,req.url);
        const ext=path.extname(filePath)
        let contentType='text/plain';
        switch(ext){
            case ".css": contentType='text/css'; break;
            case '.js': contentType = 'text/javascript'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType='image/jpeg'; break;
            case '.jpeg': contentType = 'image/jpeg'; break;
            case '.gif': contentType = 'image/gif'; break;
            case '.svg': contentType = 'image/svg+xml'; break;
            default: contentType = 'application/octet-stream';


        }
        fs.readFile(filePath,(err,data)=>{
            if(err){
                res.writeHead(404,{"contentType":"text/plain"})
                res.end("Internal Server Error")
                
            }
            res.writeHead(200,{"content-type":contentType})
            res.end(data);
        })
        return;
    }

    let filePath=path.join(__dirname,'pages')
    if(req.url==='/'){
        filePath+='/home.html';
    }

     else if(req.url==='/about'){
        filePath+='/about.html';
    }
    else if(req.url==='/dashboard'){
        filePath+='/dashboard.html';
    }
    else{
        filePath+='/404.html'
    }

    fs.readFile(filePath,(err,data)=>{
        if(err){
            res.writeHead(500,{"content-type":"text/plain"})
            res.end('Internal Server Error')
            return;
        }
        res.writeHead(200,{"content-type":"text/html"})
        res.end(data)


    })

})
    
 

 server.listen(4000,()=>{
    console.log("running")
 })
 