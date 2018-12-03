import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx';


export default class AppState {
  @observable count = 0
  @observable name = 'zkj'

  @computed get msg() {
    return `${this.name} say hello ${this.count}`
  }

  @action add(){
    this.count += 1
  }
}