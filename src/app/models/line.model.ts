import {Vocab} from './vocab.model';

export class Line {

  public type: string;
  public explanationAudioScript: string;
  public explanationVideoScript: string;
  public explanationAudioMp3: string;
  public exampleVocabReference: string;
  public mcQuestion: string;
  public mcAnswerCorrect: string;
  public mcAnswerIncorrect1: string;
  public mcAnswerIncorrect2: string;
  public mcAnswerIncorrect3: string;
  public freePrompt: string;
  public freeVocabReference: string;


  constructor(type: string) {
    this.type = type;
  }
}
