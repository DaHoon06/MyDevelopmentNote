interface UserReturnProp{
    result: boolean,
    getData: any,
}

type UserReturn = Required<UserReturnProp>

export {
    UserReturn
}