import Global from './global'


export default Global

export const createStore = () => {
  return {
    global: new Global()
  }
}