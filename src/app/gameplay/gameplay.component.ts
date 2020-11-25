import { Component, OnInit, Optional, ViewChild } from '@angular/core';
import { DomService } from '../dom.service';
import { GameService, PlaterMoveResult } from '../game.service';

@Component({
  selector: 'gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css'],
  providers: [GameService, DomService]
})
export class GameplayComponent {

  @ViewChild('log') private divLog:any;
  @ViewChild('playButton') private playButton:any
  private justFinished = false;

  constructor(private gameService:GameService, private domService: DomService) {
    console.log('s=', gameService)
   }

  ngAfterViewInit(): void {
   this.startGame();
  }

  private startGame() {
    const moveResult = this.gameService.startGame();
    this.logMove(moveResult);
  }

  playerMove(value:string) {
    if (this.justFinished) {
      this.playButton.nativeElement.textContent = 'Сделать ход'
      this.justFinished = false;
      this.startGame();
      return;
    }
    const moveResult = this.gameService.playerMove(value);
    this.logMove(moveResult);
    if (moveResult.finished) {
      this.playButton.nativeElement.textContent = 'Новая игра'
      this.justFinished = true;
    }
  }

  private logMove(result:PlaterMoveResult) {
    console.log(result.message)
    this.domService.generateLog(result.message, this.divLog);
  }

  private clearLog() {
    this.domService.clearLog(this.divLog);
  }
}
