const fs = require('fs');

function dataURLtoBlob(dataURL,mimeType) {

    var binary = atob(dataURL.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeType});
}



module.exports = function({dataURL, fileName, mimeType}, cb){

  let blob = dataURLtoBlob(dataURL, mimeType);

  var reader = new FileReader();
  reader.addEventListener("loadend", function() {
  var buffer = new Buffer(reader.result, "binary");
   fs.writeFile( fileName, buffer, function(err) {
     if(err) {
       console.log("err", err);
       if(cb) cb(err,null)
     } else {
       // success
       if(cb) cb(null,null)
     }
   });
  });

  reader.readAsArrayBuffer(blob);

}
