export namespace Board {

    interface BoardProp {

    }

    export function setBoard(board: any,){
        return {
            ...board,
        }
    }


}