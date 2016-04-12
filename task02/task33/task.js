/**
 * Created by guolimin on 2016-04-11.
 */
(function(){
    function $(id) {
        return typeof id === 'string' ? document.getElementById(id) : id;
    }
    //创建棋盘
    var initRoad = function (container, rows, columns) {
        var ele = $(tableWrap);
        var table = document.createElement('table');
        var tbody = document.createElement('tbody');
        ele.appendChild(table);
        table.appendChild(tbody);

        for (var i = 0; i <= rows-1; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j <= columns-1; j++) {
                var td = document.createElement('td');
                tr.appendChild(td);
                if (i == 0 && j == 0) {
                    td.innerHTML = "";
                }
                else if (i == 0) {
                    td.innerHTML = j;
                } else if (j == 0) {
                    td.innerHTML = i;
                } else {
                }
            }
            tbody.appendChild(tr);
        }


        chess.className = directions[curDir];
        chess.style.left = 50 * x + 'px';
        // 这里需要多加上1,是因为 chess 在 dom 中位于棋盘下面
        // y 坐标需要减去自身
        chess.style.top = -50 * (columns - y + 1) + 'px';
    };

    var chess = document.getElementById('chess');
    var directions = ['top', 'right', 'bottom', 'left'];



    initRoad('chessboard', 11, 11);
    btn.addEventListener('click', function () {
        var text = sText.value;
        text = text.replace(/^\s+|\s+$/g,'').toUpperCase();
        if (text === 'GO') {
            controller.move();
        } else if (text === 'left') {
            controller.turn(1);
        } else if (text === 'right') {
            controller.turn(2);
        } else if (text === 'back') {
            controller.turn(3);
        }
    });
})();