var player = {
    spiritPoints: 0,
    ba: 0,
    ka: 0,
    akh: 0,
    upgs: {},
    time: Date.now(),
    timeSinceUpgradeSfx: 1,
    phase: 1,
    demon:{
        spiritPoints: 0,
        ba: 0,
        ka: 0,
        akh: 0,
        upgs: {},
        timeSinceBuy: 0,
        timeSinceKbReset: 0,
        id: -1,
    },
    playerFight:{// idk what to name this | eh?...
        spiritPoints: 0,
        ba: 0,
        ka: 0,
        akh: 0,
        upgs: {},
    },
    fightingDemon: false,
    demonsBeat: 0,
}

var originalPlayer = JSON.parse(JSON.stringify(player)) // this may/may not be spaghetti code

function loop(diff){
    player.timeSinceUpgradeSfx+=diff

    if(!player.fightingDemon)player.spiritPoints+=pointGain()*diff
    else{
        player.demon.spiritPoints+=pointGain()*diff
        player.demon.timeSinceBuy+=diff
        player.demon.timeSinceKbReset+=diff

        player.playerFight.spiritPoints+=pointGain()*diff
    }
}

function pointGain(ba=player.ba,ka=player.ka,akh=player.akh){
    if(upgType(11)=="Ba")ba*=2
    else if(upgType(11)=="Ka")ka*=2

    if(upgType(13)=="Ba")ka+=Math.log2(ba+1)
    else if(upgType(13)=="Ka")ba+=Math.log2(ka+1)
    let gain = ((ba+1)*(ka+1))**(1+logBase(1+akh,2.9))
    return gain
}

function format(d,p=2){
    if(d>=1e3){
        let e = Math.floor(Math.log10(d))
        let m = d/10**e
        if(m.toFixed(p)==10){
            e++
            m=1
        }
        return m.toFixed(p)+"e"+e
    }
    return d.toFixed(p)
}

const logBase = (n, base) => Math.log(n) / Math.log(base);