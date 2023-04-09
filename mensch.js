initiate();
assign();

function initiate() {    
    stock = Array();
    stock[1] = [[true, "c00"], [true, "c01"], [true, "c10"], [true, "c11"]];
    stock[2] = [[true, "c09"], [true, "c0A"], [true, "c19"], [true, "c1A"]];
    stock[3] = [[true, "c99"], [true, "c9A"], [true, "cA9"], [true, "cAA"]];
    stock[4] = [[true, "c90"], [true, "c91"], [true, "cA0"], [true, "cA1"]];
    path = [[0, "c40"], [0, "c41"], [0, "c42"], [0, "c43"], [0, "c44"], [0, "c34"], [0, "c24"], [0, "c14"], [0, "c04"], [0, "c05"]
        , [0, "c06"], [0, "c16"], [0, "c26"], [0, "c36"], [0, "c46"], [0, "c47"], [0, "c48"], [0, "c49"], [0, "c4A"], [0, "c5A"]
        , [0, "c6A"], [0, "c69"], [0, "c68"], [0, "c67"], [0, "c66"], [0, "c76"], [0, "c86"], [0, "c96"], [0, "cA6"], [0, "cA5"]
        , [0, "cA4"], [0, "c94"], [0, "c84"], [0, "c74"], [0, "c64"], [0, "c63"], [0, "c62"], [0, "c61"], [0, "c60"], [0, "c50"]];
    homes = Array();
    homes[1] = [[false, "c51"], [false, "c52"], [false, "c53"], [false, "c54"]];
    homes[2] = [[false, "c15"], [false, "c25"], [false, "c35"], [false, "c45"]];
    homes[3] = [[false, "c59"], [false, "c58"], [false, "c57"], [false, "c56"]];
    homes[4] = [[false, "c95"], [false, "c85"], [false, "c75"], [false, "c65"]];
    winner = Array();

    document.getElementById("colr").innerHTML = "Yellow";
    document.getElementById("colr").style.color = "orange";
    document.getElementById("dice").innerHTML = "-";
    document.getElementById("diceBtn").style.backgroundColor = "orange";
    document.getElementById("diceBtn").disabled = false;
    lastDice = 0;
    plyrs = 4;
    turn = 1;
}

function assign() {
    // Clear all <td> tag's innerHTML & onclick events
    for (j = 0; j <= 10; j++) {
        for (i = 0; i <= 10; i++) {
            if (j == 10) jj = "A"; else jj = j;
            if (i == 10) ii = "A"; else ii = i;
            nam = "c" + jj + "" + ii;
            document.getElementById(nam).innerHTML = "";
            document.getElementById(nam).removeAttribute("onclick");
        }
    }
    // Stock
    for (j = 1; j <= plyrs; j++)
        for (i = 0; i <= 3; i++) {
            if (stock[j][i][0] === true) {
                switch (j) {
                    case 1:
                        document.getElementById(stock[j][i][1]).innerHTML = "<img src='gelb.png' class='piece'>";
                        break;
                    case 2:
                        document.getElementById(stock[j][i][1]).innerHTML = "<img src='grun.png' class='piece'>";
                        break;
                    case 3:
                        document.getElementById(stock[j][i][1]).innerHTML = "<img src='rot.png' class='piece'>";
                        break;
                    case 4:
                        document.getElementById(stock[j][i][1]).innerHTML = "<img src='schwarz.png' class='piece'>";
                        break;
                }
            }
        }
    // Path
    for (i = 0; i <= 39; i++) {
        switch (path[i][0]) {
            case 1:
                document.getElementById(path[i][1]).innerHTML = "<img src='gelb.png' class='piece'>";
                break;
            case 2:
                document.getElementById(path[i][1]).innerHTML = "<img src='grun.png' class='piece'>";
                break;
            case 3:
                document.getElementById(path[i][1]).innerHTML = "<img src='rot.png' class='piece'>";
                break;
            case 4:
                document.getElementById(path[i][1]).innerHTML = "<img src='schwarz.png' class='piece'>";
                break;
            default:
        }
    }
    // Homes
    for (j = 1; j <= 4; j++)
        for (i = 0; i <= 3; i++) {
            if (homes[j][i][0] == true) {
                switch (j) {
                    case 1:
                        document.getElementById(homes[j][i][1]).innerHTML = "<img src='gelb.png' class='piece'>";
                        break;
                    case 2:
                        document.getElementById(homes[j][i][1]).innerHTML = "<img src='grun.png' class='piece'>";
                        break;
                    case 3:
                        document.getElementById(homes[j][i][1]).innerHTML = "<img src='rot.png' class='piece'>";
                        break;
                    case 4:
                        document.getElementById(homes[j][i][1]).innerHTML = "<img src='schwarz.png' class='piece'>";
                        break;
                }
            }
        }
}

function playersNumbers(tot) {
    initiate();
    plyrs = tot;
    assign();
}

function toDice() {
    rnd = Math.round(Math.random() * 5) + 1;
    document.getElementById("dice").innerHTML = rnd;
    lastDice = rnd;
    document.getElementById("diceBtn").disabled = true;
    document.getElementById("escapeBtn").disabled = true;

    switch (turn) {
        case 1:
            document.getElementById("colr").innerHTML = "Green";
            document.getElementById("colr").style.color = "green";
            break;
        case 2:
            if (plyrs > 2) {
                document.getElementById("colr").innerHTML = "Red";
                document.getElementById("colr").style.color = "red";
            } else {
                document.getElementById("colr").innerHTML = "Yellow";
                document.getElementById("colr").style.color = "orange";
            }
            break;
        case 3:
            if (plyrs > 3) {
                document.getElementById("colr").innerHTML = "Black";
                document.getElementById("colr").style.color = "black";
            } else {
                document.getElementById("colr").innerHTML = "Yellow";
                document.getElementById("colr").style.color = "orange";
            }
            break;
        case 4:
            document.getElementById("colr").innerHTML = "Yellow";
            document.getElementById("colr").style.color = "orange";
            break;
    }
    gameplay();
}

function gameplay() {
    readyToTurn = true;
    // Check for pieces in stock
    if (lastDice == 6 && path[(turn - 1) * 10][0] != turn)
        for (i = 0; i <= 3; i++) {
            if (stock[turn][i][0] == true) {
                document.getElementById(stock[turn][i][1]).setAttribute("onclick", "enter(" + i + ")");
                readyToTurn = false;
            }
        }
    for (i = 0; i <= 39; i++) {
        newNo = i + lastDice;
        if (newNo >= 40) newNo -= 40;

        if (path[i][0] == turn) {
            if (checkForHome(turn, newNo, i) === true || path[newNo][0] != turn) {
                document.getElementById(path[i][1]).setAttribute("onclick", "move(" + i + ")");
                // Alone and Free rule for player who has only one piece, He/She can choose to play or not
                if (aloneAndFree(i) === true) document.getElementById("escapeBtn").disabled = false;
                readyToTurn = false;
            }
        }
    }
    if (readyToTurn === true) nextTurn();
}

function enter(pieceNo) {
    stock[turn][pieceNo][0] = false;
    startPoint = (turn - 1) * 10;
    if (path[startPoint][0] != 0) hit(startPoint);
    path[startPoint][0] = turn;
    assign();
    nextTurn();
}

function nextTurn() {
    document.getElementById("diceBtn").disabled = false;
    if (++turn > plyrs) turn = 1;
    document.getElementById("diceBtn").style.backgroundColor = col(turn);
}

function move(pathNo) {
    // Determine new cell number in path array
    newNo = pathNo + lastDice;
    if (newNo > 39) newNo -= 40;
    // Free current cell
    path[pathNo][0] = 0;
    if (checkForHome(turn, newNo, pathNo) === true) {
        // Go home
        no = newNo - ((turn - 1) * 10);
        homes[turn][no][0] = true;
        if (checkWinners(turn) === true){ 
            winner.push(turn);
            checkGameOver();
        }
    } else {
        // Check if new cell is not empty (It is opponent's piece)
        if (path[newNo][0] != 0) {
            hit(newNo);
        }
        // Set new cell
        path[newNo][0] = turn;
    }
    assign();

    nextTurn();
}

function hit(pathNo) {
    if (stock[path[pathNo][0]][0][0] == false) stock[path[pathNo][0]][0][0] = true;
    else if (stock[path[pathNo][0]][1][0] == false) stock[path[pathNo][0]][1][0] = true;
    else if (stock[path[pathNo][0]][2][0] == false) stock[path[pathNo][0]][2][0] = true;
    else stock[path[pathNo][0]][3][0] = true;
}

function col(col) {
    switch (col) {
        case 1:
            return "orange";
            break;
        case 2:
            return "green";
            break;
        case 3:
            return "red";
            break;
        case 4:
            return "gray";
            break;
        default:
            return "undefined";
    }
}

function checkForHome(col, newNo, pathNo) {
    no = newNo - ((col - 1) * 10);
    if (no <= 3 && no >= 0 && (pathNo < (col - 1) * 10 || pathNo >= 34))
        if (homes[col][no][0] === false) return true; else return false;
    else return false;
}

function aloneAndFree(no) {
    c = 0;
    for (interval = 0; interval <= 3; interval++)
        if (homes[path[no][0]][interval][0] === true) c++;
    newNo = lastDice + no;

    if (c == 3 && (newNo - ((path[no][0] - 1) * 10) >= 0) && (no < (path[no][0] - 1) * 10 || no >= 34)) return true; else return false;
}

function toEscape() {
    document.getElementById("escapeBtn").disabled = true;
    nextTurn();
}

function checkWinners(inn) {
    cou = 0;
    for (i = 0; i <= 3; i++) if (homes[inn][i][0] === true) cou++;
    if (cou == 4) return true; else return false;
}

function checkGameOver() {
    allCol = 0;
    for (k = 1; k <= plyrs; k++) {
        curCol = 0;
        for (i = 0; i <= 3; i++)
            if (homes[k][i][0] == true) curCol++; else break;
        if (curCol == 4) allCol++;
    }
    if (allCol == plyrs - 1) {
        alert("Game Over! Player " + col(winner[0]) + " is Winner!");
    }
}