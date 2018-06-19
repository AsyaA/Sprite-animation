(function () {

    // Get canvas
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var w = canvas.width,
        h = canvas.height;

    var initialCoordinates = [
        {x:w*0.475, y:260}, //1
        {x:w*0.50, y:240}, //2
        {x:w*0.45, y:240}, //3
        {x:w*0.525, y:220}, //4
        {x:w*0.475, y:220}, //5
        {x:w*0.425, y:220}, //6
        {x:w*0.55, y:200}, //7
        {x:w*0.5, y:200}, //8
        {x:w*0.45, y:200}, //9
        {x:w*0.4, y:200}, //10
        {x:w*0.575, y:180}, //11
        {x:w*0.525, y:180}, //12
        {x:w*0.475, y:180}, //13
        {x:w*0.425, y:180}, //14
        {x:w*0.375, y:180} //15
    ];

    var ballImages = [];

    function imageOnload (){
        context.drawImage(this, this.myCustomData.x, this.myCustomData.y, canvas.width*0.05, canvas.width*0.05);
    }

    function drawBalls() {
        for(var i = 1; i < 16; i++) {
            var ballImage = new Image();
            ballImage.myCustomData = {
                x: initialCoordinates[i-1].x,
                y: initialCoordinates[i-1].y
            };
            ballImage.addEventListener("load", function () {
                drawRotatedBallCanvas(ballImage, 0,3);
            });
            ballImage.src = "images/"+i+".png";
            ballImages.push(ballImage);
        }
    }

    function drawWhiteBall() {
        var whiteImage = new Image();
        whiteImage.addEventListener("load", function () {
            context.drawImage(whiteImage, w*0.475, h*0.68, w*0.05, w*0.05);
        });
        whiteImage.src = "images/white.png";
    }

    function drawBoard() {
        var board = new Image();
        board.addEventListener("load", function () {
            context.drawImage(board, 0, 0, w, h);
        });
        board.src = "images/board.png";
    }


    function drawRotatedBallCanvas(image, alpha) {
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');
        c.width = ctx.width = w*0.05;
        c.height = ctx.height = w*0.05;
        // ctx.translate(w*0.025, w*0.025);
        // ctx.rotate(-alpha);
        // ctx.translate(-w*0.025, -w*0.025);
        ctx.drawImage(image, image.myCustomData.x, image.myCustomData.y, w*0.05, w*0.05);

        context.drawImage(c, image.myCustomData.x, image.myCustomData.y);
    }








    //================================

    function startAnimation() {
        drawBoard();
        drawWhiteBall();
        drawBalls();
    }

    startAnimation();

}());
