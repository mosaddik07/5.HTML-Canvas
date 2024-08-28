const canvas = document.querySelector('#draw');
const ctx = canvas.getContext("2d");

//info: ডিসপ্লে এর হাইট এবং উইদ সেট করা হচ্ছে... 
canvas.width = 2000;
canvas.height = 1000;

//info: লাইন টানার সময় সেগুলোর বর্ডার কেমন হবে বা একটার সাথে আরেকটা জয়েন দেয়ার সময় সেটা কেমন হবে । 
ctx.strokeStyle = "rgb(0, 255, 110)";
ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

let direction = true;

function draw(e) {
    if (!isDrawing) return;
    console.log(e);

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();
    //start from
    ctx.moveTo(lastX, lastY);
    //go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    //hcl Color set
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;

    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }


}

//info: মাউস মুভ করার সময় ইভেন্ট লিসেনার যোগ করা হচ্ছে...
//info: এখন আমি যদি ডাবল ট্যাপ করে কোথায় টান দেই, তাহলে ইভেন্ট লিসেনার টা অন থাকবে , আর যদি স্বাভাবিকভাবে লিখি, তাহলে সেটা অফ থাকবে । 
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]

});
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => { isDrawing = false });
canvas.addEventListener('mouseout', () => { isDrawing = false });

