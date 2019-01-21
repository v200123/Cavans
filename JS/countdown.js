var WINDOW_WIDTH=1400;
var WINDOW_HEIGHT = 900;
var RADIUS = 8;
var MARGIN_TOP = 20;
var MARGIN_LEFT = 40;
var    balls  = [];
var colors = ["#9DC8C8","D1B6E1","F17F42","#30A9DE","#A573E0","E0E3DA","#566270","#F6B352","#AF4034","#D499B9"];
var seconds=0,hours=0,minus=0,nextShowTimeSeconds,nowSeconds=0;
var  flag =true;
var nowDate =new Date();
var nextDate = new Date();
window.onload = function () {
    var canvans = document.getElementById("canvas");
    var context = canvans.getContext("2d");

    canvans.width = WINDOW_WIDTH;
    canvans.height = WINDOW_HEIGHT;

    setInterval( function () {
            render(context);
            updata();
    },50)
        
    
}
            function render(cxt) {
                    nowDate = new Date();
                    nowHours = nowDate.getHours();
                    nowMinus = nowDate.getMinutes();
                    nowSeconds = nowDate.getSeconds();
                    console.log("之前的秒数"+nowSeconds);
                console.log("之后的秒数"+nextShowTimeSeconds);
                if(parseInt(nowSeconds)!=parseInt(nextShowTimeSeconds))
                {
                    flag=false;
                }

                console.log("flag为"+flag);
                cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
                renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(nowHours/ 10), cxt);
                renderDigit(MARGIN_LEFT + 15 * (1 + RADIUS), MARGIN_TOP, parseInt(nowHours % 10), cxt);
                renderDigit(MARGIN_LEFT + 30 * (1 + RADIUS), MARGIN_TOP, 10, cxt);
                renderDigit(MARGIN_LEFT + 45 * (1 + RADIUS), MARGIN_TOP, parseInt(nowMinus / 10), cxt);
                renderDigit(MARGIN_LEFT + 60 * (1 + RADIUS), MARGIN_TOP, parseInt(nowMinus % 10), cxt);
                renderDigit(MARGIN_LEFT + 75 * (1 + RADIUS), MARGIN_TOP, 10, cxt);
                renderDigit(MARGIN_LEFT + 90 * (1 + RADIUS), MARGIN_TOP, parseInt(nowSeconds / 10), cxt);
                renderDigit(MARGIN_LEFT + 105 * (1 + RADIUS), MARGIN_TOP, parseInt(nowSeconds % 10), cxt);

                for(var i= 0 ;i<balls.length;i++)
                {
                    cxt.fillStyle = balls[i].color;
                    cxt.beginPath();
                    cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
                    cxt.closePath();
                    cxt.fill();
                }
            }

function updata() {
    if(flag==true)
    {nextDate = new Date();
    console.error("时间更改");}
    nextShowTimeSeconds =nextDate.getSeconds();

    hours = nextDate.getHours();
    minus = nextDate.getMinutes();
    seconds = nextDate.getSeconds();
    if(nowSeconds!=nextShowTimeSeconds){
        flag=true;
        if(parseInt(hours)!=parseInt(nowHours))
        {
            if (parseInt(hours)/10!=parseInt(nowHours)/10)
            {
                addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt( hours/10));
            }
            if (parseInt(hours)%10!=parseInt( hours)%10)
            {
                addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt( hours%10));
            }
        }

        if(parseInt(minus)!=parseInt(nowMinus))
        {
            if(parseInt(minus/10)!=parseInt(nowMinus/10))
            {
                addBalls(MARGIN_LEFT+45*(RADIUS+1),MARGIN_TOP,parseInt(minus/10));
            }
            if(parseInt(minus%10)!=parseInt(nowMinus%10))
        {
            addBalls(MARGIN_LEFT+60*(RADIUS+1),MARGIN_TOP,parseInt(minus%10));
        }
        }

        if(parseInt(seconds)!=parseInt(nowSeconds))
        {
            if(parseInt(seconds/10)!=parseInt(nowSeconds/10))
            {
                addBalls(MARGIN_LEFT+90*(RADIUS+1),MARGIN_TOP,parseInt(nowSeconds/10));
            }  if(parseInt(seconds%10)!=parseInt(nowSeconds%10))
        {
            addBalls(MARGIN_LEFT+105*(RADIUS+1),MARGIN_TOP,parseInt(nowSeconds%10));
           console.log("成功将秒表添加了");
            nextDate = new Date();
        }
        }
    }
    updataBalls();

}


function updataBalls() {
    for(var i = 0 ; i<balls.length;i++)
    {
        balls[i].x += balls[i].vx;
        balls[i].y+= balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-RADIUS)
        {
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.6;
        }

    }
}

                            function addBalls(x, y, num) {
                                for (var i = 0; i < digit[num].length;i++)
                                {
                                    for (var j = 0;j<digit[num][i].length;j++)
                                    {
                                        if(digit[num][i][j]==1)
                                        {
                                            var aBall = {
                                                x:x+j*2*(RADIUS+1)+(RADIUS+1),
                                                y:y+i*2*(RADIUS+1)+(RADIUS+1),
                                                g:2.5+Math.random(),
                                                vx:Math.pow(-1,Math.ceil(Math.random()*1000))*10,
                                                vy:-5,
                                                color:colors[Math.floor(Math.random()*colors.length)]
                                            }

                                            balls.push(aBall);
                                        }
                                    }
                                }
                            }

            function renderDigit(x, y, num, cxt) {
                            cxt.fillStyle = "#D54481";

                for(var i = 0;i<digit[num].length;i++)
                        for(var j =0;j<digit[num][j].length;j++)
                            if(digit[num][i][j] == 1)
                                {
                                    cxt.beginPath();
                                    cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0,2*Math.PI);
                                    cxt.closePath();
                                    cxt.fill();
                                }
    }