import {Injectable, Logger} from "@nestjs/common";
import {Cron, SchedulerRegistry} from "@nestjs/schedule";
import {CronJob} from "cron";

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(
        private schedulerRegistry: SchedulerRegistry
    ) {
        this.addCronJob();
    }

    addCronJob() {
        const name = 'BatchTest';
        const job = new CronJob(`* * * * * *`,() => {
            this.logger.warn(`run ${name}`);
        });

        this.schedulerRegistry.addCronJob(name,job);

        this.logger.warn(`job ${name} added`);
    }

    // @Cron('* * * * * *', { name: 'cronTask' })
    // handleCron() {
    //     this.logger.log('Task Called');
    // }
}