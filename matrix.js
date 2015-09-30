canvas = document.getElementById("screen");
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
context = canvas.getContext("2d");
context.font = "12px STsong"

// columns中存放的是每一列的当前字符的 y 坐标
columns = []
for(var i = 0; i < 256; columns[i++] = 1);

// 每一帧执行一次
function step() {
    // 在canvas上画出一个几乎不透明的矩形，覆盖之前的图形，从而形成之前的文字逐渐隐去的效果
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, width, height);

    columns.map(function(value, index) {

        // 对于每一列，在Unicode中随机选取一个字符用于显示
        // 这里的选取范围是：30000-30032 (0x7530-0x7550) (田-畐)
        // String.fromCharCode()将Unicode编码转化为String类型
        var character = String.fromCharCode(30000 + Math.floor(Math.random() * 33));
        context.fillStyle = "#0F0";
        context.fillText(character,
            index * 14,
            value);
        
        // 当数组的value值大于一个随机数之后，这一列从最上方重新开始，否则字符下移10px
        columns[index] = value > (0.6+Math.random()*1.5) * height ? 0 : value + 10;
    });
}

// 每隔1000/30毫秒运行一次step()，即每秒30帧
setInterval(step, 1000/30);