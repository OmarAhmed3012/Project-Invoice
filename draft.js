
const printer = require('printer');
const fs = require('fs');

//const imagemagick = require('imagemagick-native');

const info = fs.readFileSync('ticket.txt');
console.log(Buffer.isBuffer(info));



/*
imagemagick.convert({
    srcData: data,
    srcFormat: 'PDF',
    format: 'EMF',
}, function(err, buffer) {
    if (err) {
        throw 'something went wrong on converting to EMF: ' + err;
    }

    // Now we have EMF file, send it to printer as EMF format
    printer.printDirect({
        data: buffer,
        type: 'EMF',
        success: function(id) {
            console.log('printed with id ' + id);
        },
        error: function(err) {
            console.error('error on printing: ' + err);
        }
    })
})*/


function sendPrint() {
  printer.printDirect({
    data: info,
    type: 'TEXT',
    success: function (jobID) {
      console.log("ID: " + jobID);
    },
    error: function (err) {
      console.log('printer module error: '+err);
      throw err;
    }
  });
}

sendPrint();

/*
fs.readFile('Omar Ahmed.pdf', function(err, data){
    if(err) {
      console.error('err:' + err);
      return;
    }
    console.log('data type is: '+typeof(data) + ', is buffer: ' + Buffer.isBuffer(data));
      printer.printDirect({
          data: data,
          type: 'PDF',
          success: function(id) {
              console.log('printed with id ' + id);
          },
          error: function(err) {
              console.error('error on printing: ' + err);
          }
      })
  });*/