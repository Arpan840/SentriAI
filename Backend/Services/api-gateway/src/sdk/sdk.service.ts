import {
  Injectable,
} from "@nestjs/common";

import {
  RabbitmqService,
} from "src/rabbitmq/rabbitmq.service";

@Injectable()
export class SdkService {

  constructor(
    private readonly rabbitmqService:
      RabbitmqService,
  ) {}

  async handleBulkUsage(
    events: any[],
  ) {

    for (
      const event of events
    ) {

      this.rabbitmqService
        .publishUsage(
          event,
        );
    }

    console.log(
      "SDK EVENTS RECEIVED:",
      events.length,
    );

    return {
      success: true,
    };
  }
}