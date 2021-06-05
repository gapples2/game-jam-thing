function kaBaRequirement(){
    // (B+K+1)^(2+log10(B+K+1) ez

    let amt = player.ba+player.ka+1
    amt = amt**(2+logBase(amt,10))
    if(hasUpg(12))amt = amt/(Math.log10(player[upgType(12).toLowerCase()])+1)
    return amt
}

function kbReset(type){
    if(!(player.spiritPoints>=kaBaRequirement()))return;
    player.spiritPoints=0
    player[type+"a"]++
    return playUpgradeSfx("bought")
}

function akhScore(ba=player.ba,ka=player.ka){
    if(upgType(13)=="Ba")ka+=Math.log2(ba+1)
    if(upgType(13)=="Ka")ba+=Math.log2(ka+1)

    let amt = (ba+1)*(ka+1)
    return amt
}

function akhResetGain(ba=player.ba,ka=player.ka){
    // floor(log((Ba+1)(Ka+1))) very ez

    if(upgType(13)=="Ba")ka+=Math.log2(ba+1)
    if(upgType(13)=="Ka")ba+=Math.log2(ka+1)

    return Math.min(Math.max(Math.floor(Math.log10((ba+1)*(ka+1)))-player.akh,0),1)//spaghetti code lol
}

function akhNextAt(){
    // this actually isnt complicated since all you need is 10^resetGain

    return 10**(akhResetGain()+1+player.akh)
}

function akhReset(){
    if(akhResetGain()>0.5){
        player.akh+=akhResetGain()
        player.spiritPoints=0
        player.ba=0
        player.ka=0
    }
}

function buyUpg(type,id){
    if(hasUpg(id)||upgData[id].cost>player.akh)return playUpgradeSfx("locked")
    player.akh-=upgData[id].cost
    player.upgs[id]=type
    return playUpgradeSfx("bought")
}

function hasUpg(id){
    return !!player.upgs[id]
}

function upgType(id){
    if(!hasUpg(id))return false
    return player.upgs[id]
}

function playUpgradeSfx(type){
    if(player.timeSinceUpgradeSfx>=0.2){
        player.timeSinceUpgradeSfx=0
        return new Audio("sounds/"+type+"-upgrade-sfx.mp3").play()
    }
}

const upgData = {
    // [name] is Ba/Ka, and [oppName] is the opposite name
    11:{
        desc: "Multiply [name]'s effect by 2.",
        cost: 1
    },
    12:{
        desc: "[name] reduces the requirement for the next Ba/Ka point.",
        cost: 2
    },
    13:{
        desc: "[name] points add to the effective [oppName] points.",
        cost: 4
    },
}

function phase1End() {
    if(player.akh>=5){
        player.spiritPoints=0
        player.ba=0
        player.ka=0
        player.akh=0
        player.phase=2
    }
}
// cool
//This is a button that will show up when the player reaches 5 Akhs. It'll take them to the 2nd phase of the game
//Okay. I'm going to make the last music track we will need for this. I'm also going to send what I made yesterday night in Discord chat