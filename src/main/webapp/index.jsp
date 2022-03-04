<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Lab 2</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/scripts.js"></script>
</head>
<body>

<main role="main" class="container">
    <h2>Снытюк Пердюк Сергей Дмитриевич P3210</h2>
    <h3>Enter Data:</h3>
    <div class="card">
        <form id="form" action="controllerServlet" method="post"
              onsubmit="return validate(this);">
            <label>X = </label>
            <label>
                <input type="radio" name="X" value="-3">
                -3
            </label>
            <label>
                <input type="radio" name="X" value="-2">
                -2
            </label>
            <label>
                <input type="radio" name="X" value="-1">
                -1
            </label>
            <label>
                <input type="radio" name="X" value="0" checked="checked">
                0
            </label>
            <label>
                <input type="radio" name="X" value="1">
                1
            </label>
            <label>
                <input type="radio" name="X" value="2">
                2
            </label>
            <label>
                <input type="radio" name="X" value="3">
                3
            </label>
            <label>
                <input type="radio" name="X" value="4">
                4
            </label>
            <label>
                <input type="radio" name="X" value="5">
                5
            </label>
            <label for="Y">Y = </label><input type="text" name="Y" id="Y" placeholder="(-5...5)">
            <%--			<label for="R">R = </label><input type="text" name="R" id="R" placeholder="(2...5)" onkeyup="canvasR()"--%>
            <%--			                                  maxlength="1">--%>
            <label for="R">R = </label>
            <select name="R" id="R" onchange="canvasR()">
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option selected value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
            </select>
            <input class="button" type="submit" value="Send">
        </form>
    </div>
    <br>
    <div style="min-height: 300px;min-width: 300px; max-height: 300px;max-width: 300px">
        <canvas id="canvas" onclick="clickCanvas('canvas')"
                style="background-color:#ffffff;" width="300"
                height="300"></canvas>
    </div>
    <table class="tbl">
        <tr>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Result</td>
        </tr>
        ${table}
    </table>
    <br>
</main>
</body>
</html>