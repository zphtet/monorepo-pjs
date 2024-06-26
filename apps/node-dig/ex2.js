#! usr/bin/env node
"use strict";

// Stream chunks by chunks

const path = require("path");
const fs = require("fs");
const { error } = require("console");
const getStdin = require("get-stdin");
const zlib = require("zlib");
const Transform = require("stream").Transform;
// require("dotenv").config();
const args = require("minimist")(process.argv.slice(2), {
  boolean: ["watch", "in", 'out', 'compress'],
  string: "foo",
  string: "file",
});
console.log("args", args);

let OUTPUT = path.join(__dirname, 'out.txt')

const streamEnd = (stream)=>{
   return new Promise((res)=>{
       stream.on('end',()=>{
          res();
       })
   })
}

if (args.watch) {
  console.log("You are running in watch mode");
}

if (args.file) {
  const filePath = path.resolve(args.file);
  const stream = fs.createReadStream(filePath);
  processStream(stream).then(()=> console.log('\nComplete Process Stream')).catch(err=> console.log('Error'));
}

// when stdin
if (args.in) {
  // process.stdout.write("Stdinput ");
  // getStdin().then(logWithUppercase).catch(error);
  processStream(process.stdin).then(()=> console.log("complete"));
}



async function processStream(inStream) {
  let inputStream = inStream;

  if(args.uncompress){
     inputStream = inputStream.pipe(zlib.createGunzip())
  }
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      setTimeout(callback, 1000);
      // callback();
    },
  });

  inputStream = inputStream.pipe(transformStream);

  if(args.compress){
    const gzipStream =  zlib.createGzip()
      inputStream = inputStream.pipe(gzipStream)

      OUTPUT = `${OUTPUT}.gz`
  }

  let outputStream = process.stdout;
  if(args.out){
   
     outputStream = fs.createWriteStream(OUTPUT)
  }

  inputStream.pipe(outputStream);
  await streamEnd(inputStream);
}
