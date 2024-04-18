import { Action, Interceptor, InterceptorInterface } from "routing-controllers";

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, result: any) {
    return this.responseHandler(action, result);
  }

  responseHandler(action: Action, result: any) {
    const response = action.response;
    const request = action.request;
    const statusCode = response.statusCode;
    return {
      status: true,
      path: request.url,
      statusCode,
      message: "Successfully Resource",
      result,
    };
  }
}
