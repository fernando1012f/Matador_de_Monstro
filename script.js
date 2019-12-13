new Vue({
    el: '#game',
    data: {
        showButtons: false,
        showLista: false,
        log: [],
        lifebarPlayer: {
            float:'right',
            width: '0%',
            height: '20px',
            backgroundColor: 'white'
        },
        lifebarMonster: {
            float:'right',
            width: '0%',
            height: '20px',
            backgroundColor: 'white'
        },
        lifePlayer: 100,
        lifeMonster: 100,
        colorP: 'green',
        colorM: 'green',
        victory: false,
    },
    methods: {
        newPlay(){
            this.log = [] 
            this.showButtons = true
            this.lifePlayer= 100
            this.lifeMonster= 100
            this.colorP= 'green'
            this.colorM= 'green'
            this.victory= false
            this.lifebarMonster.width = 0
            this.lifebarPlayer.width = 0
            this.showLista = false
        },
        attack(especial){
            this.showLista = true
            let damageToMonster
            let damageToPlayer
            if(especial){
                damageToMonster = this.getRandomint(10,30)
                damageToPlayer = this.getRandomint(10,15)
            }else {
                damageToMonster = this.getRandomint(1,6)
                damageToPlayer = this.getRandomint(5,9)
            }
            

            this.decreaseLife(damageToMonster,damageToPlayer)
            this.logFight(damageToMonster, damageToPlayer)

        },
        logFight(damageToMonster, damageToPlayer, witchButton) {
            now = new Date
            hour = now.getHours() <10?'0'+now.getHours():now.getHours()
            minutes = now.getMinutes() <10?'0'+now.getMinutes():now.getMinutes()
            seconds = now.getSeconds() <10?'0'+now.getSeconds():now.getSeconds()
            timeNow = hour + ':'+minutes+':'+seconds
            let attackMonstro = {time: timeNow, mensagem:"Monstro atigiu jogador com " + damageToPlayer+" ponto(s) de ataque", attack:'M'}
            let attackPlayer = {time: timeNow, mensagem: "Jogador atingiu monstro com " + damageToMonster+" ponto(s) de ataque", attack: 'P'}
            this.log.unshift(attackMonstro)
            this.log.unshift(attackPlayer)
        },
        getRandomint(min, max){
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min)) + min;

        },
        decreaseLife(damageToMonster,damageToPlayer){
            if((this.lifePlayer - damageToPlayer ) <= 0 ){
                this.lifebarPlayer.width = 100 + '%'
                this.lifebarMonster.width = (100 - this.lifeMonster) + damageToMonster + '%'
                this.lifePlayer = 0
                this.lifeMonster -=damageToMonster
            } else if ((this.lifeMonster - damageToMonster ) <= 0){
                this.lifebarPlayer.width = (100 - this.lifePlayer) + damageToPlayer + '%'
                this.lifebarMonster.width = 100 + '%'
                this.lifePlayer -=damageToPlayer
                this.lifeMonster = 0
            } else {
                this.lifebarPlayer.width = (100 - this.lifePlayer) + damageToPlayer + '%'
                this.lifebarMonster.width = (100 - this.lifeMonster) + damageToMonster + '%'
                this.lifePlayer -=damageToPlayer
                this.lifeMonster -=damageToMonster
            }    
        },
        cure(){
            this.showLista = true
            curePlayer = this.getRandomint(5,10)
            damageToPlayer = this.getRandomint(4,8)
            now = new Date
            hour = now.getHours() <10?'0'+now.getHours():now.getHours()
            minutes = now.getMinutes() <10?'0'+now.getMinutes():now.getMinutes()
            seconds = now.getSeconds() <10?'0'+now.getSeconds():now.getSeconds()
            timeNow = hour + ':'+minutes+':'+seconds

            if(this.lifePlayer >= 100){
                this.log.unshift({time: timeNow, mensagem: "Jogador está com a vida em 100%, impossivel curar!!", attack: ''})
            } else {
                this.colorP = 'green'
                this.lifePlayer = this.lifePlayer + (curePlayer - damageToPlayer)
                if (this.lifePlayer >= 100){
                    this.lifebarPlayer.backgroundColor = 'green'
                    this.lifebarPlayer.width = '100%'
                    this.lifePlayer = 100
                    this.log.unshift({time: timeNow, mensagem: "Monstro atigiu jogador com " + damageToPlayer+" ponto(s) de ataque", attack: 'M'})
                    this.log.unshift({time: timeNow, mensagem: "Jogador foi curado o maximo de vida!!", attack: ''}) 
                } else{
                    this.lifebarPlayer.width = (100 - this.lifePlayer) + (curePlayer - damageToPlayer) + '%'
                    this.log.unshift({time: timeNow, mensagem: "O Jogador curou " + curePlayer+" ponto(s) de vida", attack: 'P'})
                    this.log.unshift({time: timeNow, mensagem: "Monstro atigiu jogador com " + damageToPlayer+" ponto(s) de ataque", attack: 'M'})
                }
                
                
            }

        },
    },
    watch: {
        lifePlayer(){
            if(this.lifePlayer <= 20){
                this.colorP = 'red'
            }
            if(this.lifePlayer <= 0){
                this.victory = 'M'
                this.showButtons = false
            }
        },
        lifeMonster(){
            if(this.lifeMonster <= 20){
                this.colorM = 'red'
            }
            if(this.lifeMonster <= 0){
                this.victory = 'P'
                this.showButtons = false
            }
        }
    }

})
