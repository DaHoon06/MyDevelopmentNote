export namespace IStore {
  export interface State {
    name: string;
    token: string;
    isLogin?: boolean;
  }

  export type LoginSuccess = State;
}