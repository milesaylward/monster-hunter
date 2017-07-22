new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameActive: false,
    turns: []
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameActive = true;
      this.turns = [];

    },
    attack(power) {
      let damage = this.calcDamage(power)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player hit monster for ${damage}`
      })
      if(this.checkWin()) {
        return;
      }

      this.monsterAttack()
    },
    monsterAttack() {
      let damage =  this.calcDamage(1)
      this.playerHealth -= damage

      this.turns.unshift({
        isPlayer: false,
        text: `Monster hit player for ${damage}`
      })
      this.checkWin()
    },
    calcDamage(power) {
      let damage = Math.floor((Math.random() * (10 * power)) + 1)
      return damage;
    },
    heal() {
      let heal = Math.floor((Math.random() * 10) + 1);
      if((this.playerHealth + heal) > 100) {
        heal = 100 - this.playerHealth;
        this.playerHealth += heal
        this.turns.unshift({
          isPlayer: true,
          text: `Player healed ${heal} HP`
        })
        this.monsterAttack();
        return
      }
      this.playerHealth += heal
      this.turns.unshift({
        isPlayer: true,
        text: `Player healed ${heal} HP`
      })
      this.monsterAttack()
    },
    checkWin() {
      if(this.monsterHealth <= 0) {
        if(confirm('You Won! Play Again?')) {
          this.startGame()
        } else {
          this.gameActive =  false;
        }
        return true;
      }
      else if (this.playerHealth <= 0) {
        if(confirm('Git Gud... Play Again?')) {
          this.startGame()
        } else {
          this.gameActive = false;
        }
        return true;
      }
      return false;
    },
    giveUp() {
      this.gameActive = false;
    }
  }
})
