let R = 2;

document.addEventListener("DOMContentLoaded", function () {
    drawCanvas("canvas", R);
    // $('.r').click(function () {
    // 	$(this).prop('checked', false);
    // 	R = $(this).val();
    // 	$("#r").val($(this).val())
    // })
});

function canvasR() {
    let r_field = document.getElementById("R");
    // let r_field = $("#R_select").find(":selected").val();
    // if (r_field.value <= 2 || r_field.value >= 5 || isNaN(r_field.value) || r_field.value == null) {
    // 	drawCanvas('canvas', 3);
    // 	R = 3;
    // } else {
    console.log(r_field);
    drawCanvas('canvas', r_field.value);
    R = r_field.value;
    // }
}


function validate(form) {
    let fail = false;
    let X = form.X.value;
    let Y = form.Y.value;
    let R = form.R.value;

    if (X < -3 || X > 5 || isNaN(X) || X === "" || X.length > 5) {
        fail = "X value is incorrect!\n"
    }

    if (Y <= -5 || Y >= 5 || isNaN(Y) || Y === "" || Y.length > 5) {
        fail = "Y value is incorrect!\n";
    }

    if (R < 1 || R > 3 || isNaN(R) || R === "" || R.length > 5) {
        fail += "R value is incorrect!\n"
    }

    if (fail) {
        alert(fail);
        return false;
    } else {
        // createCanvas('canvas', X, Y, R);
        drawCanvas('canvas', R);
        return true;
    }

}

function drawCanvas(id, r) {
    let canvas = document.getElementById(id),
        cords = canvas.getContext("2d");

    //очистка
    cords.clearRect(0, 0, canvas.width, canvas.height);

    // сектор
    cords.beginPath();
    cords.moveTo(150, 150);
    cords.arc(150, 150, 130, 3 * Math.PI / 2, 0, false);
    cords.closePath();
    cords.strokeStyle = "#89b8bf";
    cords.fillStyle = "#89b8bf";
    cords.fill();
    cords.stroke();

    //треугольник
    cords.beginPath();
    cords.moveTo(85, 150);
    cords.lineTo(150, 215);
    cords.lineTo(150, 150);
    cords.lineTo(85, 150);
    cords.closePath();
    cords.strokeStyle = "#89b8bf";
    cords.fillStyle = "#89b8bf";
    cords.fill();
    cords.stroke();

    //прямоугольник
    cords.beginPath();
    cords.rect(150, 150, 65, 130);
    cords.closePath();
    cords.strokeStyle = "#89b8bf";
    cords.fillStyle = "#89b8bf";
    cords.fill();
    cords.stroke();

    //отрисовка осей
    cords.beginPath();
    cords.font = "10px Verdana";
    cords.moveTo(150, 0);
    cords.lineTo(150, 300);
    cords.moveTo(150, 0);
    cords.lineTo(145, 15);
    cords.moveTo(150, 0);
    cords.lineTo(155, 15);
    cords.strokeStyle = "#000000";
    cords.fillStyle = "#000000";
    cords.fillText("Y", 160, 10);
    cords.moveTo(0, 150);
    cords.lineTo(300, 150);
    cords.moveTo(300, 150);
    cords.lineTo(285, 145);
    cords.moveTo(300, 150);
    cords.lineTo(285, 155);
    cords.fillText("X", 290, 135);

    // деления X
    cords.moveTo(145, 20);
    cords.lineTo(155, 20);
    cords.fillText(r, 160, 20);
    cords.moveTo(145, 85);
    cords.lineTo(155, 85);
    cords.fillText((r / 2), 160, 78);
    cords.moveTo(145, 215);
    cords.lineTo(155, 215);
    cords.fillText(-(r / 2), 160, 215);
    cords.moveTo(145, 280);
    cords.lineTo(155, 280);
    cords.fillText(-r, 160, 280);

    // деления Y
    cords.moveTo(20, 145);
    cords.lineTo(20, 155);
    cords.fillText(-r, 20, 170);
    cords.moveTo(85, 145);
    cords.lineTo(85, 155);
    cords.fillText(-(r / 2), 70, 170);
    cords.moveTo(215, 145);
    cords.lineTo(215, 155);
    cords.fillText((r / 2), 215, 170);
    cords.moveTo(280, 145);
    cords.lineTo(280, 155);
    cords.fillText(r, 280, 170);

    cords.closePath();
    cords.strokeStyle = "black";
    cords.fillStyle = "black";
    cords.stroke();
}

// function createCanvas(id, x, y, r) {
//     drawCanvas(id, r);
//     let canvas = document.getElementById(id),
//         ctx = canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.rect(Math.round(150 + ((x / r) * 130)) - 2, Math.round(150 - ((y / r) * 130)) - 2, 10, 4);
    // ctx.closePath();
// }

function clickCanvas(canvasId) {
    let element = document.getElementById(canvasId);
    let position = element.getBoundingClientRect();
    let left = position.left;
    let top = position.top;
    let event = window.event;
    let x = event.clientX - left;
    let y = event.clientY - top;

    let graph_X = R * (x - 150) / 130;
    let graph_Y = R * (150 - y) / 130;

    $.ajax({
        url: "controllerServlet",
        type: "POST",
        data: {"X": graph_X, "Y": graph_Y, "R": R, "silent": "on"},
        success: function (response) {
            console.log(response);
            drawPoint(canvasId, x, y, response["in_area"]);
            $(".tbl").append(response['data'])
        },
        error: function () {
            alert("Some error processing request")
        }
    });
}


function drawPoint(id, x, y, isArea) {
    let canvas = document.getElementById(id),
        ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.ellipse(x - 1, y - 1, 2, 2, 1, 0, 2 * Math.PI, true);
    ctx.closePath();
    if (isArea) {
        ctx.strokeStyle = "#ff0000";
        ctx.fillStyle = "#ff0000";
    } else {
        ctx.strokeStyle = "#0000ff";
        ctx.fillStyle = "#0000ff";
    }
    ctx.fill();
    ctx.stroke();
}