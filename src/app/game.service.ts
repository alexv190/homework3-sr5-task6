import { Injectable } from '@angular/core';

export class PlaterMoveResult {
  constructor(
    public finished: boolean,
    public message: string,
    public cows: number,
    public bulls: number
  ) {}
}

@Injectable()
export class GameService {
  private goal: string;
  private cowsMaxCorrect:number;
  private bullsMaxCorrect:number;

  constructor() {}

  startGame(): PlaterMoveResult {
    this.planNumber();
    this.bullsMaxCorrect = 0;
    this.cowsMaxCorrect = 0;
    return new PlaterMoveResult(true, `Машина уже загадала число! Дерзайте!`, 0, 0);
  }

  playerMove(value: string): PlaterMoveResult {
    const strNum = value.toString().replace(/[^0-9]/g, '');
    return this.checkMove(strNum);
  }

  private checkMove(guessValue: string): PlaterMoveResult {
    if (guessValue.length != 4) {
      return new PlaterMoveResult(false, 'Введите черырехзначное число', 0, 0);
    }
    if (!this.checkDigitDoNotRepeat(guessValue)) {
      return new PlaterMoveResult(false, 'Цифры не должны повторяться', 0, 0);
    }
    let cows = 0;
    let bulls = 0;
    const goalChars = this.goal.split('');
    const valueChars = guessValue.split('');
    for (let i=0; i < 4; i++) {
      if (goalChars[i] == valueChars[i]) {
        bulls++;
      }
      if (guessValue.indexOf(goalChars[i]) != -1) {//если угадайка содержит символ из цели
        cows++;
      }
    }
    let message = guessValue + ': ';
    cows -= bulls;//кол-во угаданных коров
    if (cows - this.cowsMaxCorrect == 2) {
      message += 'Неплохо! '
    }
    if (cows - this.cowsMaxCorrect == 3 || bulls - this.bullsMaxCorrect == 2) {
      message += 'Отличный ход! '
    }
    if (cows - this.cowsMaxCorrect == 4) {
      message += 'Абракадабра! '
    }
    if (bulls == 4) {
      message += 'Безоговорочная победа! '
    }
    if (bulls - this.bullsMaxCorrect == 4) {
      message += 'Победа в один ход! '
    }
    message += 'Вы угадали ';
    for (let i=0; i < bulls; i++) {
      message += '🐂';
    }
    if (bulls > 0 && cows > 0) {
      message += ' и ';
    }
    for (let i=0; i < cows; i++) {
      message += '🐮';
    }
    this.cowsMaxCorrect = Math.max(this.cowsMaxCorrect, cows);
    this.bullsMaxCorrect = Math.max(this.bullsMaxCorrect, bulls);
    const finished = bulls == 4;
    return  new PlaterMoveResult(finished, message, cows, bulls);
  }

  /**
   * Проверяет 4-х символьную строку на потвторение цифр
   * @param value
   */
  private checkDigitDoNotRepeat(value: string): boolean {
    var wordSet = new Set(value);
    var lenWord = value.length;
    var lenWordSet = wordSet.size;

    return lenWord === lenWordSet;
  }

  private planNumber() {
    let num: string;
    while (true) {
      num = this.randomInteger(1000, 9999).toString();
      if (this.checkDigitDoNotRepeat(num)) {
        break;
      }
    }
    this.goal = num;
  }

  private randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
