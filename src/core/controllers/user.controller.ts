import { UserDto } from "@core/policies/user.dto";
import logger from "@config/logger";
import { Body, Controller, Get, Param, Post } from "routing-controllers";
import Container from "typedi";

@Controller()
export class UserController {
  @Get("/user")
  getRequest() {
    return "Work!";
  }
}
