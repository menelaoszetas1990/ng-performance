import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [a-zA-Z0-9-_]+ failed./;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}
