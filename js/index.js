(function () {


    var ballImage,
        stopId; //make this array because all balls can't use the same stopId
    var ballImages = [];

    function gameLoop(ball) {
        stopId = window.requestAnimationFrame(gameLoop);
        ball.update();
        ball.render();
    }

    function calculateBallSteps(options, animationObject) {
        animationObject.distanceX = options.ballFinalX - options.ballX;
        animationObject.distanceY = options.ballFinalY - options.ballY;
        if (Math.abs(animationObject.distanceX) > Math.abs(animationObject.distanceY)) {
            animationObject.spriteImagePostfix = 'X';
        } else {
            animationObject.spriteImagePostfix = 'Y';
        }

    }

    function sprite (options) {
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        // that.width = options.width;
        // that.height = options.height;
        that.image = options.image;

        that.ballFinalX = options.ballFinalX;
        that.ballFinalY = options.ballFinalY;
        that.ballX = options.ballX;
        that.ballY = options.ballY;

        calculateBallSteps(options, that);


        //calculate this two with special function and decide which sprite to use
        // that.ballXStep = options.ballXStep;
        // that.ballYStep = options.ballYStep;


        //rotate if needed, may cause some bad things
        //that.context.rotate(options.rotateAngleInRadians);


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
            if(that.ballX === that.ballFinalX || that.ballY === that.ballFinalY) {
                window.cancelAnimationFrame(stopId);
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
                50,
                50);
        };

        return that;
    }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //=====================================

    // Get canvas
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    var w = canvas.width,
        h = canvas.height;

    // // Create sprite
    // ball = sprite({
    //     context: canvas.getContext("2d"),
    //     width: 50,
    //     height: 50,
    //     image: ballImage,
    //     numberOfFrames: 30,
    //     ticksPerFrame: 1,
    //     ballFinalX: 1250,
    //     ballFinalY: 650,
    //     ballX: 150,
    //     ballY: 650,
    //     ballXStep: 3,
    //     ballYStep: 0,
    //     rotateAngleInRadians: -0.3
    // });


    function createAnimationForBall(imageObject) {
        var ball = sprite({
            context: context,
            image: imageObject,
            numberOfFrames: 30,
            ticksPerFrame: 1,
            ballX: w*0.475 + 1,
            ballY: h*0.69,
            ballFinalX: w*0.475,
            ballFinalY: h*0.5,
            ballXStep: 0,
            ballYStep: h*0.01
        });

         gameLoop(ball);
    }


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

    function myImageOnload (){
        var context = canvas.getContext("2d");
        context.drawImage(this, this.myCustomData.x, this.myCustomData.y, canvas.width*0.05, canvas.width*0.05);
    }


    // function getRotatedBallCanvas(alpha) {
    //     var c = document.createElement('canvas');
    //     var ctx = c.getContext('2d');
    //     c.width = ctx.width = 50;
    //     c.height = ctx.height = 50;
    //     var img = new Image();
    //     var w = img.naturalWidth / (img.naturalHeight / S);
    //     ctx.translate(S / 2, S / 2);
    //     ctx.rotate(-alpha);
    //     ctx.translate(-S / 2, -S / 2);
    //     ctx.drawImage(img, Math.round((S - w) / 2), 0, w, S);
    //     return c;
    // }

    for(var i = 1; i < 16; i++) {
        ballImage = new Image();
        ballImage.myCustomData = {
            x: initialCoordinates[i-1].x,
            y: initialCoordinates[i-1].y
        };
        ballImage.addEventListener("load", myImageOnload);
        ballImage.src = "images/"+i+".png";
        ballImages.push(ballImage);
    }


    var whiteImage = new Image();
    whiteImage.addEventListener("load", function () {
        var context = canvas.getContext("2d");
        context.drawImage(whiteImage, w*0.475, h*0.69, w*0.05, w*0.05);
    });
    whiteImage.src = "images/white.png";




    //=========================

    createAnimationForBall(whiteImage);




}());
