'use strict';

const bookCost = 100;
const schoolCost = 400;
const collegeCost = 1000;
const teenCost = 15;
const adultCost = 30;
const wiseCost = 60;

let cursors, runner, encountNumber, excountNumber;
let tileSprite;
let effortCounter = 0;
let tempeffortCounter = 0;
let effortIncrement = 1;
let experienceCounter = 0;
let experiencePereffort = 160;
let speedfactor = 5;
let worldWidth = window.innerWidth;
let worldHeight = window.innerHeight;
let bookAmount = 1;
let schoolAmount = 0;
let collegeAmount = 0;
let upgradeButtonsData = [];
let animationName = 'baby-run';

class LifeSate extends Phaser.State {
  preload() {
    this.load.image('background', 'assets/images/full-bg.png');
    // this.load.image('layer-1', 'assets/images/layer-1.png');
    // this.load.image('layer-2', 'assets/images/layer-2.png');
    // this.load.image('layer-3', 'assets/images/layer-3.png');
    // this.load.image('layer-5', 'assets/images/layer-5.png');
    // this.load.image('layer-6', 'assets/images/layer-6.png');

    this.load.image('effort', 'assets/icons/S_Buff08.png');
    this.load.image('experience', 'assets/icons/I_Scroll02.png');

    this.load.image('book', 'assets/icons/I_Book.png');
    this.load.image('school', 'assets/icons/Ac_Medal02.png');
    this.load.image('college', 'assets/icons/I_Scroll.png');
    this.load.image('teen', 'assets/icons/I_Crystal01.png');
    this.load.image('adult', 'assets/icons/I_Sapphire.png');
    this.load.image('wise', 'assets/icons/I_Diamond.png');

    this.load.atlas(
      'baby-runner',
      'assets/images/baby-runner/baby-runner.png',
      'assets/images/baby-runner/baby-runner.json'
    );

    this.load.atlas(
      'teen-runner',
      'assets/images/teen-runner/teen-runner.png',
      'assets/images/teen-runner/teen-runner.json'
    );

    this.load.atlas(
      'adult-runner',
      'assets/images/adult-runner/adult-runner.png',
      'assets/images/adult-runner/adult-runner.json'
    );

    this.load.atlas(
      'wise-runner',
      'assets/images/wise-runner/wise-runner.png',
      'assets/images/wise-runner/wise-runner.json'
    );

    this.scaleMode = Phaser.ScaleManager.RESIZE;
    this.pageAlignHorizontally = true;
    this.pageAlignVertically = true;
    //this.setScreenSize(true);

    let upannel = this.add.bitmapData(320, 275);
    upannel.ctx.fillStyle = '#64B5F6';
    upannel.ctx.strokeStyle = '#1E88E5';
    upannel.ctx.lineWidth = 8;
    upannel.ctx.fillRect(0, 0, 320, 275);
    upannel.ctx.strokeRect(0, 0, 320, 275);
    this.cache.addBitmapData('upgradePanel', upannel);

    let buttonImage = this.add.bitmapData(310, 45);
    buttonImage.ctx.fillStyle = '#E3F2FD';
    buttonImage.ctx.strokeStyle = '#42A5F5';
    buttonImage.ctx.lineWidth = 2;
    buttonImage.ctx.fillRect(0, 0, 310, 45);
    buttonImage.ctx.strokeRect(0, 0, 310, 45);
    this.cache.addBitmapData('button', buttonImage);

    let cpannel = this.add.bitmapData(300, 100);
    this.cache.addBitmapData('counterPanel', cpannel);

    let counter = this.add.bitmapData(300, 50);
    this.cache.addBitmapData('counter', counter);
  }
  create() {
    this.state.start('Game');
  }
}

class GameState extends Phaser.State {
  create() {
    // this.background = this.add.group();
    // ['layer-1', 'layer-2', 'layer-3', 'layer-5', 'layer-6'].forEach(image => {
    //   let bg = this.add.tileSprite(0, 0, worldWidth, worldHeight, image, '', this.background);
    //   bg.tileScale.setTo(0.5, 0.5);
    //   tileSprite.push(bg);
    // });
    const backgroundWidth = this.cache.getImage('background').width;
    const backgroundHeight = this.cache.getImage('background').height;
    tileSprite = this.add.tileSprite(
      0,
      0,
      worldWidth,
      worldHeight,
      'background'
    );
    tileSprite.tileScale.setTo(
      worldWidth / backgroundWidth,
      worldHeight / backgroundHeight
    );

    // const bannerText = '14 Clicker Game';
    // let banner = this.add.text(this.world.centerX, 50, bannerText);
    // banner.padding.set(10, 16);
    // banner.fontSize = 30;
    // banner.fill = '#0D47A1';
    // banner.anchor.setTo(0.5);

    this.counterPanel = this.add.image(
      worldWidth - 320,
      70,
      this.cache.getBitmapData('counterPanel')
    );
    let counters = this.counterPanel.addChild(this.add.group());
    counters.position.setTo(0, 0);

    let encount;
    encount = this.add.image(0, 0, this.cache.getBitmapData('counter'));
    encount.icon = encount.addChild(this.add.image(2, 2, 'effort'));
    encount.text = encount.addChild(
      this.add.text(40, 6, 'Effort:', {
        font: '24px Arial Black'
      })
    );
    encountNumber = this.add.image(0, 0, this.cache.getBitmapData('counter'));
    encountNumber.text = encountNumber.addChild(
      this.add.text(215, 6, '0', {
        font: '24px Luckiest Guy',
        fill: '#EF6C00'
      })
    );

    counters.addChild(encount);
    counters.addChild(encountNumber);

    let excount;
    excount = this.add.image(0, 40, this.cache.getBitmapData('counter'));
    excount.icon = excount.addChild(this.add.image(2, 2, 'experience'));
    excount.text = excount.addChild(
      this.add.text(40, 6, 'Experience:', {
        font: '24px Arial Black'
      })
    );

    excountNumber = this.add.image(0, 40, this.cache.getBitmapData('counter'));
    excountNumber.text = excountNumber.addChild(
      this.add.text(215, 6, '0', {
        font: '24px Luckiest Guy',
        fill: 'green',
        stroke: 'green'
      })
    );

    counters.addChild(excount);
    counters.addChild(excountNumber);

    this.upgradePanel = this.add.image(
      50,
      70,
      this.cache.getBitmapData('upgradePanel')
    );
    let upgradeButtons = this.upgradePanel.addChild(this.add.group());
    upgradeButtons.position.setTo(5, 5);

    upgradeButtonsData = [
      {
        icon: 'book',
        name: 'Books',
        amount: bookAmount,
        cost: `${bookCost} effort`,
        description: 'Increase Effort Gain',
        purchaseHandler: button => {
          if (effortCounter >= bookCost) {
            ++effortIncrement;
            ++bookAmount;
            effortCounter -= bookCost;
            tempeffortCounter -= bookCost;
            button.text.text = `${
              button.details.name
            }: ${bookAmount} -- Cost: ${button.details.cost}`;
            encountNumber.text.text = effortCounter;
          }
        }
      },
      {
        icon: 'school',
        name: 'School Years',
        amount: schoolAmount,
        cost: `${schoolCost} effort`,
        description: 'Automatic Effort',
        purchaseHandler: button => {
          if (effortCounter >= schoolCost) {
            ++schoolAmount;
            effortCounter -= schoolCost;
            tempeffortCounter -= schoolCost;
            button.text.text = `${
              button.details.name
            }: ${schoolAmount} -- Cost: ${button.details.cost}`;
            encountNumber.text.text = effortCounter;
            setInterval(() => {
              effortCounter += effortIncrement;
              tempeffortCounter += effortIncrement;
              const expToAdd = Math.floor(
                tempeffortCounter / experiencePereffort
              );
              if (expToAdd > 0) {
                experienceCounter += expToAdd;
                tempeffortCounter = 0;
                excountNumber.text.text = experienceCounter;
              }
              encountNumber.text.text = effortCounter;
            }, 2000);
          }
        }
      },
      {
        icon: 'college',
        name: 'College Years',
        amount: collegeAmount,
        cost: `${collegeCost} effort`,
        description: 'Automatic Experience',
        purchaseHandler: button => {
          if (effortCounter >= collegeCost) {
            ++collegeAmount;
            effortCounter -= collegeCost;
            tempeffortCounter -= collegeCost;
            encountNumber.text.text = effortCounter;
            button.text.text = `${
              button.details.name
            }: ${collegeAmount} -- Cost: ${button.details.cost}`;
            setInterval(function() {
              ++experienceCounter;
              excountNumber.text.text = experienceCounter;
            }, 4000);
          }
        }
      },
      {
        icon: 'teen',
        name: 'Teen',
        amount: null,
        cost: `${teenCost} exp`,
        description: 'Get Experience 2X Faster',
        purchaseHandler: button => {
          if (experienceCounter >= teenCost) {
            experienceCounter -= teenCost;
            excountNumber.text.text = experienceCounter;
            experiencePereffort = 80;
            runner.kill();
            runner = this.add.sprite(
              this.world.centerX - 48,
              worldHeight - 250,
              'teen-runner'
            );
            runner.scale.set(1.1, 1.1);
            animationName = 'teen-run';
            runner.animations.add(animationName, null, true);
            runner.inputEnabled = true;
            runner.input.useHandCursor = true;
            runner.events.onInputDown.add(this.onClickRunner, this);
            speedfactor = 50;
            runner.animations.play(animationName, speedfactor, true);
          }
        }
      },
      {
        icon: 'adult',
        name: 'Adult',
        amount: null,
        cost: `${adultCost} exp`,
        description: 'Get Experience 4X Faster ',
        purchaseHandler: button => {
          if (experienceCounter >= adultCost) {
            experienceCounter -= adultCost;
            excountNumber.text.text = experienceCounter;
            experiencePereffort = 40;
            runner.kill();
            runner = this.add.sprite(
              this.world.centerX - 48,
              worldHeight - 270,
              'adult-runner'
            );
            runner.scale.set(1.2, 1.2);
            animationName = 'adult-run';
            runner.animations.add(animationName, null, true);
            runner.inputEnabled = true;
            runner.input.useHandCursor = true;
            runner.events.onInputDown.add(this.onClickRunner, this);
            speedfactor = 50;
            runner.animations.play(animationName, speedfactor, true);
          }
        }
      },
      {
        icon: 'wise',
        name: 'Wise',
        amount: null,
        cost: `${wiseCost} exp`,
        description: 'Get Experience 8X Faster ',
        purchaseHandler: button => {
          if (experienceCounter >= wiseCost) {
            experienceCounter -= wiseCost;
            excountNumber.text.text = experienceCounter;
            experiencePereffort = 20;
            runner.kill();
            runner = this.add.sprite(
              this.world.centerX - 48,
              worldHeight - 270,
              'wise-runner'
            );
            runner.scale.set(1.2, 1.2);
            animationName = 'wise-run';
            runner.animations.add(animationName, null, true);
            runner.inputEnabled = true;
            runner.input.useHandCursor = true;
            runner.events.onInputDown.add(this.onClickRunner, this);
            speedfactor = 50;
            runner.animations.play(animationName, speedfactor, true);
          }
        }
      }
    ];

    runner = this.add.sprite(
      this.world.centerX - 48,
      this.world.height - 300,
      'baby-runner'
    );
    runner.animations.add('baby-run', null, true);
    runner.inputEnabled = true;
    runner.input.useHandCursor = true;
    runner.events.onInputDown.add(this.onClickRunner, this);

    upgradeButtonsData.forEach((buttonData, index) => {
      let button;
      button = this.add.button(
        0,
        44 * index,
        this.cache.getBitmapData('button')
      );
      button.icon = button.addChild(this.add.image(10, 4, buttonData.icon));
      let headButtonText = buttonData.name;
      if (buttonData.amount !== null) {
        headButtonText += `: ${buttonData.amount}`;
      }
      button.text = button.addChild(
        this.add.text(50, 4, `${headButtonText} -- Cost: ${buttonData.cost}`, {
          font: '12px Arial Black'
        })
      );
      button.details = buttonData;
      button.descText = button.addChild(
        this.add.text(50, 24, buttonData.description, {
          font: '10px Arial Black',
          fill: 'blue'
        })
      );
      button.events.onInputDown.add(buttonData.purchaseHandler, this);
      upgradeButtons.addChild(button);
    });
  }

  onClickRunner() {
    effortCounter += effortIncrement;
    tempeffortCounter += effortIncrement;
    runner.animations.play(animationName, 50, true);
    speedfactor += (7 * (experienceCounter || 1)) / effortCounter;
    runner.animations.currentAnim.speed = speedfactor;

    const expToAdd = Math.floor(tempeffortCounter / experiencePereffort);
    if (expToAdd >= 1) {
      experienceCounter += expToAdd;
      tempeffortCounter = tempeffortCounter % experiencePereffort;
      excountNumber.text.text = experienceCounter;
    }

    encountNumber.text.text = effortCounter;

    let timeToLive = 200;
    let effect = 'physics';
    let bg = false;
    let bgColor = 0xfec72a;

    new FloatingText(this, {
      text: `${effortIncrement}⭐️`,
      animation: effect,
      textOptions: {
        fontSize: 18,
        fill: '#EF6C00',
        wordWrap: true,
        wordWrapWidth: 200,
        font: 'Luckiest Guy'
      },
      hasBackground: bg,
      backgroundColor: bgColor,
      x: runner.x + Math.floor(Math.random() * runner.width - 1) + 1,
      y: runner.y - Math.floor(Math.random() * 60 - 1) - 20,
      timeToLive: timeToLive
    });
  }

  update() {
    if (effortCounter > 0) {
      // tileSprite.forEach(ts => (ts.tilePosition.x += -(speedfactor / 10)));
      tileSprite.tilePosition.x += -(speedfactor / 10);
    }
  }
}

class Game extends Phaser.Game {
  constructor() {
    super(worldWidth, worldHeight, Phaser.CANVAS, '', '', true);
    this.state.add('Life', LifeSate);
    this.state.add('Game', GameState);
    this.state.start('Life');
  }
}

new Game();
