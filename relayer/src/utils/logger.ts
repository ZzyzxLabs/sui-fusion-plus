/**
 * Simple logging utility
 */
export class Logger {
  private static formatTime(): string {
    return new Date().toISOString();
  }

  public static info(message: string, data?: any): void {
    console.log(`[${this.formatTime()}] INFO: ${message}`, data ? data : '');
  }

  public static error(message: string, error?: any): void {
    console.error(`[${this.formatTime()}] ERROR: ${message}`, error ? error : '');
  }

  public static warn(message: string, data?: any): void {
    console.warn(`[${this.formatTime()}] WARN: ${message}`, data ? data : '');
  }

  public static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${this.formatTime()}] DEBUG: ${message}`, data ? data : '');
    }
  }
}

export default Logger;