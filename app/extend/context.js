/**
 * Created by heweiguang on 2018/8/3.
 */

module.exports = {
  async getFileStreamWithoutFileNotFoundError() {
    const parts = this.multipart({ autoFields: true });
    const stream = await parts();

    stream.fields = parts.field;
    stream.once('limit', () => {
      const err = new Error('Request file too large');
      err.name = 'MultipartFileTooLargeError';
      err.status = 413;
      err.fields = stream.fields;
      err.filename = stream.filename;
      if (stream.listenerCount('error') > 0) {
        stream.emit('error', err);
        this.coreLogger.warn(err);
      } else {
        this.coreLogger.error(err);
        // ignore next error event
        stream.on('error', () => {});
      }
      // ignore all data
      stream.resume();
    });

    return stream;
  }
}
