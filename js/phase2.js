const demonData = {
    /*
    
    id:{
        name: name,
        bossType: "gatekeeper"/"boss"
        kbResetTime: false/number,
        akhResetAmt: false/["ba",number]/["ka",number]/number,
        upgrades: false/["ka", number, "prio]/["ba", number, "prio"]/["number", "prio"],
        win(){return player.akh>number}
    },
    
    */
    0: {
        name: ["TAT",  "SET"],
        bossType: "gatekeeper",
        kbResetTime: false,
        akhResetAmt: false,
        upgrades: false,
        win() { return player.playerFight.akh > 0.5 }
        },
    1:{
        name: "SAA-SET",
        bossType: "gatekeeper",
        kbResetTime: 10,
        akhResetAmt: 1,
        upgrades: false,
        win(){return player.akh>9.5}
    },
    2:{
        name: "AQEBI",
        bossType: "gatekeeper",
        kbResetTime: ["ba", 5],
        akhResetAmt: 1,
        upgrades: "ka",
        win() { return player.akh>19.5 }
    },
    3:{
        name: "TCHETBI",
        bossType: "gatekeeper",
        kbResetTime: ["ka",5],
        akhResetAmt: 1,
        upgrades: "ka",
        win() { return player.akh>29.5}
    },
    4: {
        name: "TEKA-HRA",
        bossType: "gatekeeper",
        kbResetTime: 5,
        akhResetAmt: 2,
        upgrades: true,
        win() { return player.akh > 29.5 }
    },
    5: {
        name: "OSIRIS",
        bossType: "boss",
        kbResetTime: ["ka", 5],
        akhResetAmt: 1,
        upgrades: "ka",
        win() {return player.playerFight.spiritPoints > player.demon.spiritPoints },
    },
    6: {
        name: "SET-EM-MAAT-F",
        bossType: "gatekeeper",
        kbResetTime: 5,
        akhResetAmt: 2,
        upgrades: true,
        win() { return player.akh > 29.5 }
    }
}
function doDemonTick(){
    if(player.demon.id==-1)return;

    if(player.demon.id==0&&demonData[0].win()){
        // first demon has no ai so just skip through it

        player.demon.id=-1
        player.demonsBeat++
        return;
    }

    let demon = demonData[player.demon.id]

    // first do kbResetTime
    if((typeof demon.kbResetTime)=="object"){
        // ["ka",number] and ["ba",number]

        let time = demon.kbResetTime[1]
        if(player.demon.timeSinceKbReset>=time){
            
        }
    }
}
//each "Gatekeeper" fight will probably have its own background (Letorin will be doing that) | K
//That demon only resets for Ba though...