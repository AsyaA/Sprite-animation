(function () {

    //====================================================================




    var ball,
        ballImage,
        canvas,
        stopId;

    function gameLoop () {
        stopId = window.requestAnimationFrame(gameLoop);
        ball.update();
        ball.render();
    }

    function sprite (options) {

        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.ballFinalX = options.ballFinalX;
        that.ballFinalY = options.ballFinalY;
        that.ballX = options.ballX;
        that.ballY = options.ballY;

        that.ballXStep = options.ballXStep;
        that.ballYStep = options.ballYStep;



        that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

                tickCount = 0;

                //decelerate moving
                ticksPerFrame++;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function () {
            if(that.ballX >= that.ballFinalX && that.ballY <= that.ballFinalY) {
                window.cancelAnimationFrame(stopId);
                //start animating 9th ball


                ballImage = new Image();
                ballImage.src = "images/9.png";
                var options = {
                    context: canvas.getContext("2d"),
                    width: 50,
                    height: 50,
                    image: ballImage,
                    numberOfFrames: 30,
                    ticksPerFrame: 1,
                    ballFinalX: 190,
                    ballFinalY: 280,
                    ballX: 190,
                    ballY: 428.2,
                    ballXStep: 0,
                    ballYStep: -3
                };

                startAnimation(options);



            }

            // Clear the canvas
            that.context.clearRect(that.ballX, that.ballY, w*0.05, w*0.05);

            that.ballX += that.ballXStep;
            that.ballY += that.ballYStep;

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * 300,
                0,
                300,
                300,
                that.ballX,
                that.ballY,
                w*0.05,
                w*0.05);
        };

        return that;
    }







    //====================================================================

    // Get canvas
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var w = canvas.width,
        h = canvas.height;

    var initialCoordinates = [
        {x:w*0.475, y:260, alpha: 0.3}, //1
        {x:w*0.50, y:240, alpha: 0}, //2
        {x:w*0.45, y:240, alpha: 0}, //3
        {x:w*0.525, y:220, alpha: 0}, //4
        {x:w*0.475, y:220, alpha: 0}, //5
        {x:w*0.425, y:220, alpha: 0}, //6
        {x:w*0.55, y:200, alpha: 0}, //7
        {x:w*0.5, y:200, alpha: 0}, //8
        {x:w*0.45, y:200, alpha: 0}, //9
        {x:w*0.4, y:200, alpha: 0}, //10
        {x:w*0.575, y:180, alpha: 0}, //11
        {x:w*0.525, y:180, alpha: 0}, //12
        {x:w*0.475, y:180, alpha: 0}, //13
        {x:w*0.425, y:180, alpha: 0}, //14
        {x:w*0.375, y:180, alpha: 0} //15
    ];

    var finalCoordinates = [
        {x:w*0.475, y:260}, //1
        {x:w*0.50, y:240}, //2
        {x:w*0.45, y:240}, //3
        {x:w*0.525, y:220}, //4
        {x:w*0.475, y:220}, //5
        {x:w*0.425, y:220}, //6
        {x:w*0.55, y:200}, //7
        {x:w*0.5, y:200}, //8
        {x:w*0.4, y:45}, //9 final
        {x:w*0.4, y:200}, //10
        {x:w*0.575, y:180}, //11
        {x:w*0.525, y:180}, //12
        {x:w*0.475, y:180}, //13
        {x:w*0.425, y:180}, //14
        {x:w*0.375, y:180} //15
    ];

    var balls = [], whiteImage;

    function drawBalls() {
        for(var i = 1; i < 16; i++) {
            var ballImage = new Image();
            ballImage.myCustomData = {
                x: initialCoordinates[i-1].x,
                y: initialCoordinates[i-1].y,
                alpha: initialCoordinates[i-1].alpha,
                index: i
            };
            ballImage.addEventListener("load", function () {
                drawRotatedBallCanvas(this);
            });
            ballImage.src = "images/"+i+".png";
        }
    }

    var whiteCanvas;
    function drawWhiteBall() {

        // var whiteImage = new Image();



        whiteImage = new Image();
        whiteImage.addEventListener("load", function () {


            whiteCanvas = document.createElement('canvas');
            var ctx = whiteCanvas.getContext('2d');
            whiteCanvas.width = ctx.width = w*0.05;
            whiteCanvas.height = ctx.height = w*0.05;
            ctx.drawImage(whiteImage, 0, 0, w*0.05, w*0.05);
            context.drawImage(whiteCanvas, w*0.475, h*0.68, w*0.05, w*0.05);



            //context.drawImage(whiteImage, w*0.475, h*0.68, w*0.05, w*0.05);
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

    function drawRotatedBallCanvas(image) {
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');
        c.width = ctx.width = w*0.05;
        c.height = ctx.height = w*0.05;
        ctx.translate(w*0.025, w*0.025);
        ctx.rotate(-image.myCustomData.alpha);
        ctx.translate(-w*0.025, -w*0.025);
        ctx.drawImage(image, 0, 0, w*0.05, w*0.05);
        context.drawImage(c, image.myCustomData.x, image.myCustomData.y, w*0.05, w*0.05);
        balls.push(c);
    }


    function startAnimation(options) {
        ball = sprite(options);

        //calculate which one need to pick, X or Y sprite

        ballImage.addEventListener("load", gameLoop);
    }





    //================================

    function start() {
        drawBoard();
        drawWhiteBall();
        drawBalls();

        ballImage = new Image();
        ballImage.src = "images/white.png";
        var options = {
            context: canvas.getContext("2d"),
            width: 50,
            height: 50,
            image: ballImage,
            numberOfFrames: 30,
            ticksPerFrame: 1,
            ballFinalX: 190,
            ballFinalY: 280,
            ballX: 190,
            ballY: 428.2,
            ballXStep: 0,
            ballYStep: -3
        };


        //start animating white ball
        startAnimation(options);

    }

    start();

}());
