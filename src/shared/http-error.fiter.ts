import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  Logger
} from '@nestjs/common'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const cxt = host.switchToHttp()
    const request = cxt.getRequest()
    const response = cxt.getResponse()
    const status = exception.getStatus()
    const errorResponse = {
      code: status,
      timestap: new Date().toDateString(),
      path: request.url,
      method: request.method,
      error: exception.message || null
    }

    Logger.error(
      ` ${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter'
    )

    response
      .status(errorResponse.code || HttpStatus.NOT_FOUND)
      .json(errorResponse)
  }
}
