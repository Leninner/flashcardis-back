import { Catch, HttpException, ExceptionFilter } from '@nestjs/common'

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    return new HttpException(
      {
        status: exception.getStatus(),
        error: exception.getResponse(),
      },
      exception.getStatus(),
    )
  }
}
