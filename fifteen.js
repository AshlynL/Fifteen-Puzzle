(function() {
	"use strict";
    //keep track of empty tile
    var emptyX = 300;
    var emptyY = 300;
    var space = 16;
    var win_div = document.createElement("div");
    window.onload = function(){
        //creates tiles
        var parent = document.getElementById("puzzlearea");
        for (var i=0; i<15; i++){
            var square = document.createElement("div");
            square.className = "block";
            parent.appendChild(square);
            var text = document.createTextNode(i+1);
            square.appendChild(text);
        }
        //sets position and background image
        var pieces = document.querySelectorAll(".block");
        for (var j=0; j<pieces.length; j++){
            pieces[j].style.left = (j%4*100)+'px';
            pieces[j].style.top = (parseInt(j/4)*100) + 'px';
            pieces[j].style.backgroundPosition = '-' + pieces[j].style.left + ' ' + '-' + pieces[j].style.top;
            pieces[j].id = j+1;
            pieces[j].onclick = onClick;
            pieces[j].onmouseover = mouseOver;
            pieces[j].onmouseout = mouseOut;
        }
        var button = document.getElementById("shufflebutton");
        button.onclick = shuffle;
    }
    function onClick(){
        win_div.innerHTML = "";
        var x = parseInt(this.style.left);
        var y = parseInt(this.style.top);
        var dx = 0;
        var dy = 0;
        //right
        if (right(this)){
            dx = 100;
            emptyX -= 100;
            space -= 1;
            this.id = parseInt(this.id)+1;
        }
        //left
        else if (left(this)) {
            dx = -100;
            emptyX += 100;
            space += 1;
            this.id = parseInt(this.id)-1;
        }
        //down
        else if (down(this)) {
            dy = 100;
            emptyY -= 100;
            space -=4;
            this.id = parseInt(this.id)+4;
        }
        //up
        else if (up(this)) {
            dy = -100;
            emptyY += 100;
            space += 4;
            this.id = parseInt(this.id)-4;
        }
        this.style.left = x + dx + 'px';
        this.style.top = y + dy + 'px';
        //check if won
        won();
    }

    function shuffle() {
        win_div.innerHTML = "";
        for (var z=0; z<1000; z++){
            var neighbors = [];
            var potential = [document.getElementById(space+1), document.getElementById(space-1), document.getElementById(space+4), document.getElementById(space-4)];
            for (var n=0; n<potential.length; n++){
                if (potential[n] != null){
                    neighbors.push(potential[n]);
                }
            }
            var rand = parseInt(Math.random()*(neighbors.length));
            var x = parseInt(neighbors[rand].style.left);
            var y = parseInt(neighbors[rand].style.top);
            var dx = 0;
            var dy = 0;
        //right
            if (right(neighbors[rand])){
                dx = 100;
                emptyX -= 100;
                space -= 1;
                neighbors[rand].id = parseInt(neighbors[rand].id)+1;
            }
        //left
            else if (left(neighbors[rand])) {
                dx = -100;
                emptyX += 100
                space += 1;
                neighbors[rand].id = parseInt(neighbors[rand].id)-1;
            }
        //down
            else if (down(neighbors[rand])) {
                dy = 100;
                emptyY -= 100;
                space -= 4;
                neighbors[rand].id = parseInt(neighbors[rand].id)+4;
            }
        //up
            else if (up(neighbors[rand])) {
                dy = -100;
                emptyY += 100;
                space += 4;
                neighbors[rand].id = parseInt(neighbors[rand].id)-4;
            }
            neighbors[rand].style.left = x + dx + 'px';
            neighbors[rand].style.top = y + dy + 'px';
        }
    }
    function right(tile){
        var x = parseInt(tile.style.left);
        var y = parseInt(tile.style.top);
        if (emptyX == x+100 && emptyY == y){
            return true;
        }
    }
    function left(tile){
        var x = parseInt(tile.style.left);
        var y = parseInt(tile.style.top);
        if (emptyX == x-100 && emptyY == y){
            return true;
        }
    }
    function down(tile){
        var x = parseInt(tile.style.left);
        var y = parseInt(tile.style.top);
        if (emptyY == y+100 && emptyX == x){
            return true;
        }
    }
    function up(tile){
        var x = parseInt(tile.style.left);
        var y = parseInt(tile.style.top);
        if (emptyY == y-100 && emptyX == x){
            return true;
        }
    }
    function mouseOver(){
        if (left(this) || right(this) || up(this) || down(this)){
            this.style.border = "5px solid red";
            this.style.color = "red";
            this.style.cursor = "pointer";
        }
    }
    function mouseOut(){
        this.style.border = "5px solid black";
        this.style.color = "black";
        this.style.cursor = "default";
    }
    function won(){
        var pieces = document.querySelectorAll(".block");
        var t_or_f = true;
        for (var w=0; w<pieces.length; w++){
            if (parseInt(pieces[w].id) != w+1){
                t_or_f = false;
            }
        }
        if (t_or_f == true){
            win_div.id = "win";
            var win_text = document.createTextNode("Congratulations! You won the game!");
            win_div.appendChild(win_text);
            document.getElementById("output").appendChild(win_div);
        }
    }
})();