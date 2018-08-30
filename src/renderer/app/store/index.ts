import { observable } from 'mobx';

export class Store {
  @observable
  public playCanvas: HTMLCanvasElement;
}

export default new Store();
