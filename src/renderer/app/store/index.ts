import { observable, computed } from 'mobx';

export class Store {
  @observable
  public test = 'Test';
}

export default new Store();
