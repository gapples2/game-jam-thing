function save(){
    localStorage["the-weighing-of-the-hearts"]=JSON.stringify(player)
}

function load(){
    player = Object.assign(player,JSON.parse(localStorage["the-weighing-of-the-hearts"]))
}
function hardReset(){
    player = originalPlayer;
    save();
    load();
}