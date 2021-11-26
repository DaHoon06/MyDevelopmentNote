export namespace INTERFACES {

    export interface IToDo {
        todo_content: string,
        doing: string,
        deleteCheck: string,
        createdAt: Date,
        updatedAt: Date,
    }

    export interface IBoard{
        bNum: number,
        title: string,
        content: string,
        writer: string,
        createData: string,
        updatedDate: string,
        isComment: number,
        isDelete: number,
        hit: number,
    }



}