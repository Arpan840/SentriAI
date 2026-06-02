import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { SdkService }
from "./sdk.service";

@Controller("sdk")
export class SdkController {

  constructor(
    private readonly sdkService:
      SdkService,
  ) {}

  @Post("usage/bulk")
  async usageBulk(
    @Body()
    body: any,
  ) {

    return this.sdkService
      .handleBulkUsage(
        body.events,
      );
  }
}