import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx';


export default class Global {
  constructor( {count, name} = {count: 0, name: 'syr'} ){
    this.count = count
    this.name = name
  }
  @observable count
  @observable name

  @computed get msg() {
    return `${this.name} say hello ${this.count}`
  }

  @action add(){
    this.count += 1
  }

  toJson() {
    return {
      count: this.count,
      name: this.name
    }
  }
}