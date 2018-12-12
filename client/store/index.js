import Global from './global'


export default {
  global: new Global()
}

export const createStore = () => {
  return {
    global: new Global()
  }
}