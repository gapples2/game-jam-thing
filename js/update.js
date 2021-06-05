const $ = x => document.getElementById(x)

function updateLoop(){
    $("spiritPoints").innerText = format(player.spiritPoints)
    $("ba").innerText = format(player.ba,0)
    $("ka").innerText = format(player.ka,0)
    $("akh").innerText = format(player.akh,0)
    $("akhGain").innerText = format(akhResetGain())
    $("spGain").innerText = format(pointGain())
    $("kbReq").innerText = format(kaBaRequirement())
    $("akhNext").innerText = format(akhNextAt())
    $("akhScore").innerText = format(akhScore())
    $("akhEff").innerText = format(1+logBase(1+player.akh,2.9))

    if(player.phase==1&&player.akh>4.5)$("phase1").style.display="block"
    else $("phase1").style.display="none"

    let upgAmt = Object.keys(upgData).length
    for(let z=0;z<2;z++){
        for(let x=0;x<Math.floor(upgAmt/3)+1;x++){
            for(let y=0;y<Math.min(upgAmt-x*3,3);y++){
                let id = (x+1)*10+y+1
                if(hasUpg(id)||upgData[id].cost>player.akh){$(["Ba","Ka"][z]+"_"+id).style.cursor="not-allowed";$(["Ba","Ka"][z]+"_"+id).style.appearance = "none"}
                else {$(["Ba","Ka"][z]+"_"+id).style.cursor="";$(["Ba","Ka"][z]+"_"+id).style.appearance = "auto"}

                if(hasUpg(id)){
                    if((upgType(id)=="Ba"&&z==0)||(upgType(id)=="Ka"&&z==1))$(["Ba","Ka"][z]+"_"+id).style.borderColor = "#00ff00"
                    else $(["Ba","Ka"][z]+"_"+id).style.borderColor = "#ff0000"
                }else $(["Ba","Ka"][z]+"_"+id).style.borderColor = "#ddddff"
            }
        }
    }
}

function runLoop(){
    loop((Date.now()-player.time)/1000)
    player.time=Date.now()
    updateLoop()
}

function startUp(){
    let song = new Audio("sounds/Opening_of_the_Mouth.mp3")
    song.loop  =  true
    song.play()

    setTimeout(function(){song.currentTime=4;setInterval(song.currentTime=4,64000)},68000)// this is how im doing this music stuff

    $("start").style.display="none"
    $("main").style.display="block"

    player.time=Date.now()

    if(localStorage["the-weighing-of-the-hearts"])load()

    let upgAmt = Object.keys(upgData).length
    let types = ["Ba","Ka"]
    for(let z=0;z<2;z++){
        for(let x=0;x<Math.floor(upgAmt/3)+1;x++){
            let r = document.createElement("tr")
            document.getElementById(types[z]+"Upgs").appendChild(r)
            for(let y=0;y<Math.min(upgAmt-x*3,3);y++){
                let id = (x+1)*10+y+1
                let upgDesc = upgData[id].desc
                let desc = upgDesc
                while(desc.includes("[name]"))desc=desc.replace("[name]",types[z])
                while(desc.includes("[oppName]"))desc=desc.replace("[oppName]",types[(z+1)%2])
                let td = document.createElement("td")
                let d = document.createElement("button")
                td.appendChild(d)
                d.onclick=function(){return buyUpgFunc(types[z],id)}
                d.innerHTML=desc+"<br><br>"+upgData[id].cost+" akh."
                d.style.cssText = "height:100px;width:150px;border-color: #ddddff;"
                d.id = types[z]+"_"+id
                r.appendChild(td)
            }
        }
    }

    setInterval(runLoop,20)
    setInterval(save,10000)
}

function buyUpgFunc(type,id){return buyUpg(type,id)}