javascript:

(function () {
  "use strict";


  function initApp() {
    var canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 200;
    canvas.style.border = '2px solid gold';
    document.body.appendChild(canvas);
    
    var options = {
      canvas: canvas,
      useCORS: true,
      proxy: 'http://cors-proxy.htmldriven.com/'
    };

    html2canvas(document.body, options).then(function(canvas) {
      console.log('Drew on the existing canvas');
    });

  }

  function getApp() {
    var url = "//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js";
    var js = document.createElement('script');
    js.addEventListener('load', function () {
      console.log("loaded the real deal");
      initApp();
    });

    js.src = url;
    document.head.appendChild(js);
  }

  console.log('This bookmarklet begins!');
  // this site may or may not have the jQuery we want...
  // so we'll just get what we want and worry about the consequences
  // if the happen!
  var js = document.createElement('script');
  js.addEventListener('load', getApp);
  js.src = "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js";
  document.head.appendChild(js);
}());