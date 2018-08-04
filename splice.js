var URL = window.webkitURL || window.URL;



window.onload = function() {
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles, false);  
}

function handleFiles(e) {
    var reader  = new FileReader();
    var file = e.target.files[0];
    // load to image to get it's width/height
    var img = new Image();
    img.onload = function() {
      
      let scale_size = $("#sizeScale").val();
      $('#imgUpload').slideToggle();
      
      var i;
      for (i = 0; i <= 7; i++) {
        
        let sprite = "sprite" + i;
        let dlId = "dlId" + i;        
        
        $("#previewWrapper").append( '<div class="spriteFrame"><canvas id="' + sprite + '"></canvas><br /><div id="' + dlId + '"</div>' );
        
        let elementId = "sprite" + 1;
        console.log(elementId);
        let ctx = document.getElementById('sprite' + i).getContext('2d');
        
        // scale canvas to image
        ctx.canvas.width = (img.width / 4) * scale_size;
        ctx.canvas.height = (img.height / 2) * scale_size;
        ctx.imageSmoothingEnabled = false;
        // draw image
        ctx.drawImage(img, (img.width / 4) * retX(i), (img.height / 2) * retY(i),
                      (img.width / 4), img.height / 2,
                      0, 0,
                      (img.width / 4) * scale_size, (img.height / 2) * scale_size);
        
        dlId = document.getElementById(dlId);
        $(dlId).append('<a download="' + sprite + '.png" href="' + document.getElementById(sprite).toDataURL() + '">Download</a>');
        
      }
      
      
        
    }
    // this is to setup loading the image
    reader.onloadend = function () {
        img.src = reader.result;
    }
    // this is to read the file
   	reader.readAsDataURL(file);
  
    $('#return').slideToggle();
  
}

function retY(key) {
  if (key > 3) {
    return 1;
  } else {
    return 0;
  }
}

function retX(key) {
  if (key <= 3) {
    return key;
  } else {
    return (key - 4);
  }
}

