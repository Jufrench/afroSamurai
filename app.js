let heros = [
  {
    img: "https://cdn.glitch.com/15a9b237-4e99-4ed3-a00c-88086d6b4873%2FafroSamurai.jpg?1528835999255",
    name: 'Afro Samurai',
    health: 100,
    power: 40,
    stamina: 100,
    special: 'The No.2 Headband',
  },
  {
    name: 'Ninja Ninja',
    health: 70,
    boost: true,
    stamina: 100,
    active: false
  }
];

let villains = [
  {
    name: 'Fisherman',
    health: 60,
    power: 10,
    stamina: 50,
    active: false,
    img: '',
  },
  {
    name: 'Farmer',
    health: 70,
    power: 15,
    stamina: 60,
    active: false,
    img: ''
  },
  {
    name: 'Samurai',
    health: 80,
    power: 20,
    stamina: 70,
    active: false,
    img: ''
  },
  {
    name: 'Kuma',
    health: 100,
    power: 25,
    stamina: 90,
    active: false,
    img: ''
  }
];

let battleArr = [];
let villCardArr = [];
let defeatedArr = [];
let startButton = document.getElementById('start-button');
let logArray = [];
let logDiv = document.getElementById('game-log');


let start = {

  startGame: function() {
    // Show Game Log
    startButton.addEventListener('click', function() {
      let log = document.getElementById('game-log');
      log.style.display = 'inline-block';
    });
    views.showAfro();
    views.showVillains();
    views.updateLog('Welcome Afro Samurai!');
    views.updateLog('Click on an enemy to the right.');
  },
  endGame: function() {
    if (heros[0].health === 0) {
      alert('You lose!');
      let playAgain = confirm('Do you care to play again?');
      if (playAgain === true) {
        this.startGame();
      }
    }

    if (villains.length === 0 && battleArr.length === 0) {
      alert('You win!');
      let playAgain = confirm('Do you care to play again?');
      if (playAgain === true) {
        location.reload();
      }
    }
  },
  displayHeros: function() {
    heros.forEach(function(char) {
      console.log(char.name);
    });
  },
  displayVillains: function() {
    villains.forEach(function(char) {
      console.log(char.name);
    });
  },
  chooseEnemy: function(position) {
//     if (position < villains.length) {
//       let chosen = villains.splice(position, 1);
//       battleArr.push(chosen);
//       chosen = battleArr[0][0];

//       console.log('You chose ' + chosen.name);
//     } else {
//       console.log('Not a valid villain');
//       }
    // views.chooseEnemy();
  },
  attack: function() {
    if (!battleArr.length) {
      views.updateLog('You must choose an enemy first!');
      document.getElementById('attack-button').classList.add('active-button');
    }
    let random = Math.floor(Math.random() * (heros[0].power - 10) + 10);
    let enemy = battleArr[0][0];

    if (enemy.health > 0) {
      if (heros[0].stamina > 0) {
        let random = Math.floor(Math.random() * (heros[0].power - 10) + 10);
        // let enemy = battleArr[0];

        views.updateLog('Afro attacks ' + enemy.name + ' for ' + random + ' damage!');

        console.log('Afro attacks ' + enemy.name + ' for ' + random + ' damage!');
        enemy.health = enemy.health - random;

        if (enemy.health <= 0) {
          views.updateLog('Afro defeated ' + enemy.name);
          views.updateLog('Choose your next enemy!');
          console.log('Afro defeated ' + enemy.name);
          console.log('Afro\'s stamina: ' + heros[0].stamina);
          defeatedArr.push(battleArr.shift());
          views.updateBattleZone();
          views.updateVillains();
          console.log(villains);

          console.log('---------');
          console.log('Choose your next enemy');
          // start.displayVillains();
          views.showVillains();
        } else {
            console.log(enemy.name + '\'s ' + 'health: ' + enemy.health);
            heros[0].stamina = heros[0].stamina - 7;
            if (heros[0].stamina < 0) {
              heros[0].stamina = 0;
            }
            console.log('Afro\'s stamina: ' + heros[0].stamina);
            console.log('---------');
            this.defend();
          }
      } else {
          console.log('You\'re fatigued! You must wait a turn.');
          heros[0].stamina = heros[0].stamina + 25;
          this.defend();
        }
    }
    this.endGame();
    this.scrollToBottom();
  },
  defend: function() {
    let chance = Math.floor(Math.random() * (7 - 1) + 1);
    let random = Math.floor(Math.random() * (battleArr[0][0].power - 1) + 1);
    let villain = battleArr[0][0];

    if (villain.stamina === 0) {
      views.updateLog(villain.name + ' is fatigued! They must wait a turn.');
      console.log(villain.name + ' is fatigued! They must wait a turn.');
      villain.stamina = villain.stamina + 25;
    } else {
        if (chance === 1) {
          views.updateLog(villain.name + ' missed! Afro takes no damange.');
          console.log(villain.name + ' missed! Afro takes no damange.');
          villain.stamina = Math.round(villain.stamina - villain.stamina * 0.15);
          console.log(villain.name + '\'s stamina: ' + villain.stamina);
        } else if (chance === 2) {
            let damage = Math.round(random * .15);
            heros[0].health = heros[0].health - damage;
            views.updateLog('Afro blocked ' + villain.name + '\'s attack & received reduced damage of ' + damage + '!');
            console.log('Afro blocked ' + villain.name + '\'s attack & received reduced damage of ' + damage + '!');
            console.log('Afro\'s health: ' + heros[0].health);
            villain.stamina = Math.round(villain.stamina - villain.stamina * 0.15);
            console.log(villain.name + '\'s stamina: ' + villain.stamina);
          } else {
            heros[0].health = heros[0].health - random;
            views.updateLog(villain.name + ' attacked Afro for ' + random + ' damage!');
            console.log(villain.name + ' attacked Afro for ' + random + ' damage!');
            console.log('Afro\'s health: ' + heros[0].health);
            villain.stamina = Math.round(villain.stamina - villain.stamina * 0.15);
            // views.updateLog(villain.name + '\'s stamina: ' + villain.stamina);
            console.log(villain.name + '\'s stamina: ' + villain.stamina);
          }
      }
    this.scrollToBottom();
    views.updateStats();
    start.endGame();
  },
  ninjaBoost: function() {
    if (!heros[1].boost) {
      console.log('Ninja Ninja\'s boost has already been used.');
      return;
    } else {
        heros[1].boost = false;
        let random = Math.floor(Math.random() * (25 - 10) + 10);
        let healthValue;

        if (heros[0].health + random > 100) {
          heros[0].health = 100;
          console.log('Ninja Ninja hypes you up! You\'re at max health!');
        } else {
            heros[0].health = heros[0].health + random;
            console.log('Ninja Ninja hypes you up! Your health increased by ' + random + '!');
          }
      }
  },
  scrollToBottom() {
    let gameLog = document.getElementById('game-log');
    gameLog.scrollTop += 100;
  }
};

// ======================================================================================||
// ======================================================================================||

let views = {

  showAfro: function() {
    startButton.addEventListener('click', function() {
      document.getElementById('start-button').style.display = 'none';

      let img = document.createElement('img');
      img.src = 'https://cdn.glitch.com/15a9b237-4e99-4ed3-a00c-88086d6b4873%2FafroSamurai.jpg?1528835999255';

      // Show Afro Stats
      let par = document.createElement('p');
      let afroStats = String(heros[0].name + '<br/> Health: ' + heros[0].health + '<br/> Power: '
        +  heros[0].power + '<br> Stamina: ' + heros[0].stamina + '<br/> Special: ' + heros[0].special);
      par.innerHTML = afroStats;
      let div = document.createElement('div');
      div.setAttribute('id', 'afro');
      div.appendChild(img);
      div.appendChild(par);
      let herosDiv = document.getElementById('heros-div');
      herosDiv.insertBefore(div, herosDiv.childNodes[0]);

      document.getElementById('button-div').classList.remove('inactive');
    });

  },
  updateStats: function() {
    let img = document.createElement('img');
    img.src = 'https://cdn.glitch.com/15a9b237-4e99-4ed3-a00c-88086d6b4873%2FafroSamurai.jpg?1528835999255';

    let nestedP = document.getElementById('afro').getElementsByTagName('p')[0];
    let afroDiv = document.getElementById('afro');
    nestedP.innerHTML = " ";
    afroDiv.innerHTML = " ";
    let herosDiv = document.getElementById('heros-div');
    afroDiv.appendChild(nestedP);
    afroDiv.appendChild(img);
    herosDiv.appendChild(afroDiv);

    let afroStats = String(heros[0].name + '<br/> Health: ' + heros[0].health + '<br/> Power: '
      +  heros[0].power + '<br> Stamina: ' + heros[0].stamina + '<br/> Special: ' + heros[0].special);
    nestedP.innerHTML = afroStats;
    afroDiv.appendChild(nestedP);
    herosDiv.insertBefore(afroDiv, herosDiv.childNodes[0]);
    views.updateBattleZone();
  },
  showNinja: function() {

  },
  showVillains: function() {
    // if (defeatedArr === 0) {
     let villDiv = document.getElementById('villains-div');
      startButton.addEventListener('click', function() {
        villains.forEach(function(villain, index) {
          let div = views.villainDiv(villain, index);
          villDiv.appendChild(div);
          villCardArr.push(div);
        });
        views.chooseEnemy();
      });

    if (battleArr.length === 0) {
      let villainsDiv = document.getElementById('villains-div');
      villCardArr.forEach(function(villain) {
        villain.classList.remove('inactive');
      });
      console.log(villCardArr);
    }
  },
  villainDiv: function(villain, index) {
    let paragraph = document.createElement('p');
    let villStats = String(villain.name + '<br/> Health: ' + villain.health + '<br/> Power: ' + villain.power
      + '<br/> Stamina: ' + villain.stamina);
    paragraph.innerHTML = villStats;
    let div = document.createElement('div');
    div.classList.add('villain-card');
    div.appendChild(paragraph);
    div.dataset.index = index;
    return div;
  },
  chooseEnemy: function() {
    let villainsDiv = document.getElementById('villains-div');
    let villainCards = document.getElementById('villains-div').children;
    let children = villainsDiv.children;
    villainsDiv.addEventListener('click', function(event) {
      let clicked = event.target;
      let index = clicked.closest('.villain-card').dataset.index;
      index = Number(index);
      views.updateLog('You chose ' + villains[index].name);
      battleArr.push(villains.splice(index, 1));
      console.log(battleArr);
      villCardArr.splice(index, 1);
      if (battleArr.length > 0) {
        for (let i = 0; i < children.length; i++) {
          children[i].classList.add('inactive');
        }
      }
      views.updateBattleZone();
    });
    start.scrollToBottom();
  },
  updateBattleZone: function() {
    let battleZone = document.getElementById('battle-zone');
    if (battleArr.length === 0) {
      battleZone.innerHTML = '';
    } else {
        if (battleArr[0][0].health > 0) {
          let p = document.createElement('p');
          p.innerHTML = String(battleArr[0][0].name + '<br/> Health: ' + battleArr[0][0].health +
            '<br/> Power: ' + battleArr[0][0].power + '<br/> Stamina: ' + battleArr[0][0].stamina);
          battleZone.innerHTML = '';
          battleZone.appendChild(p);
        }
      }
  },
  updateVillains: function() {
    let villDiv = document.getElementById('villains-div');
    villDiv.innerHTML = '';
    villains.forEach(function(villain, index) {
      let div = views.villainDiv(villain, index);
      villDiv.appendChild(div);
      villCardArr.push(div);
    });
  },
  updateLog: function(logItem) {
    let logUl = document.getElementById('log-ul');
    let li = document.createElement('li');
    li.innerHTML = String(logItem);
    logUl.appendChild(li);
  }
}


start.startGame();
