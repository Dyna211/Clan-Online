// ==UserScript==
// @name      xd
// @version   1.0
// @author    Dyna
// @description  try to take over the world!
// @match   http*://www.margonem.pl/profile/view,*
// @match   https://www.margonem.pl/
// @match https://katahha.margonem.pl/
// @grant     GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @connect   margonem.pl
// @run-at document-end
// ==/UserScript==



// Tampermonkey Storage
var menuPosition = '0px,0px', showMenu = false;
let vh = [minLvl = 1,maxLvl = 500,valuePlayersMessage = 7,refreshPlayer = 30,clan = 'link klanu',World = 'katahha',dcUrl = 'Link DC'];
var iGOM = vh[3]*1000;
const data = {
    menuPosition:menuPosition,
    showMenu:showMenu,
    vh:vh,
}

function updateStorage(){
    data.menuPosition = menuPosition;
    data.showMenu = showMenu;
    data.vh = vh;
    GM_setValue('Checkerka',data);
}

function getStorage(){
    const get = GM_getValue('Checkerka');
    if(!get) updateStorage();
    else{
        menuPosition = get.menuPosition;
        showMenu = get.showMenu;
        vh = get.vh;
    }
}


// 

function global(){
    var style = document.createElement('style');
style.innerText = `
.globalBox-checkerka, .panel-help-checkerka{
position: fixed;
    font-family: sans-serif;
    width: 200px;
    background: rgb(0 0 0);
    z-index: 999;
    box-sizing: border-box;
    user-select: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 0 0 1px #010101, 0 0 0 2px #888, 0 0 0 3px #0c0d0d, 2px 2px 3px 3px rgba(12, 13, 13, .4);
     font-size: 15px;
    color: white;
}
    .text-checkerka-uper{
    font-size: 14px;
    color: white;
    width: 100%;
    height: 32%;
    }


    .space-line-checkerka{
    margin-top: 3px;
    width: 202px;
    background: #888888b3;
    height: 1px;
    margin-left: -1px;
    }
    .settings-checkerka{
    width: 6%;
    height: 100%;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
    top: 1px;
    position: absolute;
    left: 90%;
    }


.input-checkerka:focus {
    border-color: #0c0d0d;
    box-shadow: 0 0 3px 1px #47a14b;
}
    .input-checkerka::placeholder{
    color: rgba(255, 255, 255, 0.5);
}
    .input-checkerka {
    width: 40px;
    margin-top: 5px;
    height: 14px;
    border: 1px solid rgb(162 162 162);
    background-color: rgba(255, 255, 255, 0.1);
    color: #eee;
    font-size: 12px;
    outline: none;
    border-radius: 3px;
    text-align: center;
    margin-left: 45px;
    transition: all ease;
        display: inline-block;
    margin-bottom: 10px;
}

.text-settings-checkerka{
    width: 50%;
    font-size: 14px;
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 10px;
}
    .d-checkerka{
    margin-bottom: 5px;
    border: 1px solid #7a7a7d;
    font-size: 13px;
    height: 20px;
    margin-left: 2px;
    padding: 2px;
    border-radius: 5px;
    }
    .d-prof{
        float: right;
    vertical-align: middle;
    display: inline-block;
    margin-right: 3px;
    }
    .online-number-che{
        color: green;
    position: absolute;
    vertical-align: middle;
    display: inline-block;
    margin-left: 5px;
    top: 1px;
    font-weight: bold;
    }
  

`;
document.body.appendChild(style);
getStorage();


// Create element 
const globalBox = document.createElement('div');
globalBox.classList.add('globalBox-checkerka');
globalBox.style.left = menuPosition.split(',')[0];
globalBox.style.top =  menuPosition.split(',')[1];
globalBox.id = 'globalbox';
document.body.appendChild(globalBox);

const containerTitle = document.createElement('div');
containerTitle.classList.add('text-checkerka-uper');
globalBox.appendChild(containerTitle);

const titleBox = document.createElement('div');
titleBox.style.verticalAlign = 'middle';
titleBox.style.display = 'inline-block';
containerTitle.appendChild(titleBox);

const pOD = document.createElement('div');
pOD.classList.add('online-number-che')
containerTitle.appendChild(pOD);

const settingsBox = document.createElement('div');
settingsBox.innerHTML = '\u2699';
settingsBox.classList.add('settings-checkerka');
containerTitle.appendChild(settingsBox);

const CPO = document.createElement('div');
globalBox.appendChild(CPO);

const hMenu  = document.createElement('div');
hMenu.classList.add('panel-help-checkerka');
hMenu.style.display = 'none';
document.body.appendChild(hMenu);



settingsBox.addEventListener('click',()=>{
    if(hMenu.style.display == 'block'){
        hMenu.style.display = 'none';
        globalBox.style.height = 'auto';
        CPO.style.display = 'block';
        CPO.style.height = 'auto';
        return;
    }else{
        hMenu.style.display = 'block'
        const x = menuPosition.split(',')[0];
        const y = parseInt(menuPosition.split(',')[1]) + 19;
        hMenu.style.left = x; hMenu.style.top = `${y}px`;
        CPO.style.display = 'none';
        CPO.style.height = '100px';
        globalBox.style.height = '100px';
    }

})

const sh = ['Minimalny lvl','Maksymalny lvl','Discord Message','Refresh Time','Clan','World','Discord URL'];
for(let i = 0; i < sh.length; i++){
    const c = document.createElement('div');
    c.classList.add('container-settings-checkerka');
    hMenu.appendChild(c);
    const d = document.createElement('div');
    d.innerHTML = sh[i];
    d.classList.add('text-settings-checkerka');
    if(i == 0)d.style.marginTop = '10px';
    if(i >= 4)d.style.width = '13%';
    c.appendChild(d);
    const inp = document.createElement('input');
    inp.classList.add('input-checkerka');
    inp.value = vh[i];
    if(i >= 4) inp.style.width = '120px';
    c.appendChild(inp);

    inp.addEventListener('input',(e)=>{
        vh[i] = e.target.value;
        if(i == 3)iGOM = vh[3]*1000;
        updateStorage();
    });
};




var isD = false,offsetX,offsetY;
globalBox.addEventListener('mousedown',(e)=>{
    if(hMenu.style.display == 'block') return;
    isD = true;
    offsetX = e.clientX - parseInt(globalBox.style.left);
    offsetY = e.clientY - parseInt(globalBox.style.top);
});
globalBox.addEventListener('mousemove',(e)=>{
if(isD){
    let x = e.clientX - offsetX; let y = e.clientY - offsetY;
    globalBox.style.left = `${x}px`; globalBox.style.top = `${y}px`
    
}
})
globalBox.addEventListener('mouseup',()=>{
    if(isD){
        isD = false;
        menuPosition = `${globalBox.style.left},${globalBox.style.top}`;
        updateStorage();
    }
});
globalBox.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
    if(showMenu == true){
        CPO.style.display = 'none';
    }else if(showMenu == false) CPO.style.display = 'block';
    showMenu = !showMenu;
    updateStorage();
})
if(!showMenu){
    CPO.style.display = 'none';
}else CPO.style.display = 'block';
//

//Request
var memberClan = [];
var cd;
function getAllMember(){
    if(vh[4] == 'link klanu' || vh[4] == '') return;
    GM_xmlhttpRequest({
      method: "GET",
      url: vh[4],
      onload: function(response) {
        var v = response.responseText;
        var s = document.createElement('div');
        s.innerHTML = v;
        cd = s.querySelector("title").textContent.split('-')[0];
        titleBox.innerHTML = cd;
        var p = s.querySelectorAll("div.guild-members-container table tbody tr");
        p.forEach(function(row) {
            const n = row.querySelector("td.nick a").textContent.trim();
            const l = row.querySelector("td.level").textContent.trim();
            const p = row.querySelector("td.prof").textContent.trim();
            if(parseInt(l) >= vh[0] && parseInt(l) <= vh[1]){
                memberClan.push({
                    nick:n,
                    lvl:l,
                    prof:p
                })
            }
          });
      }
    });
  getOnlineMember();
  }setTimeout(getAllMember,500);

  var bNd = false;

  async function sendDiscordMessage(title, a) {
    if(bNd || vh[6] == 'Link DC') return;
    const data = new FormData();
    let description = "Członkowie klanu online:\n";
    for(let i = 0; i < a.length; i++){
        description += `${i+1}.${a[i].v} ${a[i].b} ${a[i].n}\n`;
    }
    data.append('payload_json', JSON.stringify({
        username: `Checkerka ${cd}`,
        avatar_url: 'https://avatar.rf4game.com/rf4game.de/wp-content/uploads/avatar/256/2172/2172410.jpg',
        embeds: [{
            color: 1388608,
            description: description,
            title: title,
            timestamp: new Date().toISOString()
        }]
    }));

    try {
        const response = await fetch(vh[6], {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        bNd = true;
    } catch (error) {
        console.error('Error ', error);
    }
}  

function getOnlineMember(){
    let memberOnline = [];
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://www.margonem.pl/stats",
      onload: function(response) {
        if(response.status != 200){
            setTimeout(getOnlineMember,30000);
            return;
        } 
        var v = response.responseText;
        var s = document.createElement('div');
        s.innerHTML = v;
        var nickQ = s.querySelector(`div > div > div > div.body-container > div > div.overlay.current-players-overlay > div.light-brown-box.news-container.no-footer.${vh[5]}-popup > div.news-body`);
        var pOnline = nickQ.textContent;

        for(let i = 0; i < memberClan.length; i++){
            if(pOnline.includes(memberClan[i].nick)){
                memberOnline.push({
                    v:memberClan[i].nick,
                    b:memberClan[i].lvl,
                    n:memberClan[i].prof,
                })
            }
        }

        // Do menu
        const profession = {
          'Paladyn': 'p',
          'Wojownik': 'w',
          'Tancerz ostrzy': 'b',
          'Mag': 'm',
          'Tropiciel': 't',
          'Łowca': 'h',
        };

        // Add Player to box
        if(memberOnline.length > 0){
          
          CPO.innerHTML = '';
          for(let u = 0; u < memberOnline.length; u ++){
            const p = profession[memberOnline[u].n];

 
            const c = document.createElement('div');
            c.classList.add('d-checkerka');
            if(u == 0) c.style.marginTop = '5px';
            CPO.appendChild(c);
 
            const d = document.createElement('div');
            d.innerHTML = `${u+1}.${memberOnline[u].v} `;
            d.style.verticalAlign = 'middle';
            d.style.display = 'inline-block';
            c.appendChild(d);

            const pl = document.createElement('div');
            pl.classList.add('d-prof');
            pl.innerHTML = `${memberOnline[u].b}${p}`;
            c.appendChild(pl);
          }
          if(memberOnline.length >= vh[2]){
            sendDiscordMessage(`Checkerka ${cd}`,memberOnline);
          }
          pOD.innerHTML = `(${memberOnline.length})`;
          pOD.style.color = 'green';
        }else{
            pOD.innerHTML = `(0)`;
            pOD.style.color = 'red';
            CPO.innerHTML = '';
        }
      }
    });
  }setInterval(getOnlineMember,iGOM);



}global();


