import { Routes } from "nest-router";
import { PostModule, UsersModule } from "./index";


const MODULE_ALL = [PostModule, UsersModule, ];
const ROUTES: Routes = [];

for(const module of MODULE_ALL){
    const modulePath = module
        .toString()
        .substring(6)
        .split('Module')[0]
        .toLowerCase();
    ROUTES.push({
        path: `/${modulePath}`,
        module: module,
    });
}

export {
    ROUTES,
    MODULE_ALL
}