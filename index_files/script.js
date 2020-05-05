$('.tryon_view').hide()
$('.rotatealert').hide();
// to canvas
$('.toCanvas').click(function(e) {
  var test = $("#capture")[0];
  html2canvas(test).then(function(canvas) {
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
	Canvas2Image.saveAsImage(canvas, canvasWidth, canvasHeight, "png", "Ornaz Trial Ring");
  });
});

//to canvas
$('.try_on_image_list').click(function(e) {
    var product_url = this.getAttribute('data-product-target');
    var try_on_image_src = this.getAttribute('src');
    $(".current_ring")[0].src = try_on_image_src;
});



function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
	    reader.onloadend = function (e) {
	      $('#myImg').attr('src', e.target.result);
	      EXIF.getData(input.files[0], function() {
             var img = $("#myImg").get(0);
			       var canvas = $("#myCanvas").get(0);
             orientation(img, canvas); //modifying orientation of canvas.
             resize_canvas(); // scaling to window width if image width > window. width..
		    });
    };
    reader.readAsDataURL(input.files[0]);
  }
}





// Function to check orientation of image from EXIF metadatas and draw canvas
function orientation(img, canvas) {
    var ctx = canvas.getContext("2d");
    var exifOrientation = '';
    var width = img.width,
        height = img.height;
    // Check orientation in EXIF metadatas
    EXIF.getData(img, function() {
        var allMetaData = EXIF.getAllTags(this);
        exifOrientation = allMetaData.Orientation;
        console.log('Exif orientation: ' + exifOrientation);
        console.log(allMetaData);
    });
    // set proper canvas dimensions before transform & export
    if (jQuery.inArray(exifOrientation, [5, 6, 7, 8]) > -1) {
        canvas.width = height;
        canvas.height = width;
    } else {
        canvas.width = width;
        canvas.height = height;
    }
    switch (exifOrientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
        case 3:
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, height, width);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
        default:
            ctx.transform(1, 0, 0, 1, 0, 0);
    }
    ctx.drawImage(img, 0, 0, width, height);
}

function resize_canvas(){
    canvas = document.getElementById("myCanvas");
    if (canvas.width  > window.innerWidth){canvas.style.width  = String(window.innerWidth)+"px";}
}

$('#inputimage').on('change',function(){
      $('.demo').hide();
			readURL(this);
      $('.tryon_view').show();
})

function alertPatriot(){
 if (window.innerHeight > window.innerWidth){
 //if (window.innerWidth > window.innerHeight){
    //alert("please rotate your device..");
    $('.rotatealert').show();
  }else{
    $('.rotatealert').hide();
  }
}
//adding event listner to detect rotation..
window.addEventListener("orientationchange", alertPatriot, false);
//alertPatriot();
