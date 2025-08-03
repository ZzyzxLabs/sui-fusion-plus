/**
 * Enhanced logging utility for the resolver
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: any;
  orderId?: string;
  chain?: string;
  txHash?: string;
}

export class Logger {
  private logLevel: LogLevel;
  private logs: LogEntry[];
  private maxLogs: number;

  constructor(logLevel: LogLevel = LogLevel.INFO, maxLogs: number = 1000) {
    this.logLevel = logLevel;
    this.logs = [];
    this.maxLogs = maxLogs;
  }

  /**
   * Set the minimum log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  /**
   * Log a debug message
   */
  debug(message: string, data?: any, context?: { orderId?: string; chain?: string; txHash?: string }): void {
    this.log(LogLevel.DEBUG, message, data, context);
  }

  /**
   * Log an info message
   */
  info(message: string, data?: any, context?: { orderId?: string; chain?: string; txHash?: string }): void {
    this.log(LogLevel.INFO, message, data, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, data?: any, context?: { orderId?: string; chain?: string; txHash?: string }): void {
    this.log(LogLevel.WARN, message, data, context);
  }

  /**
   * Log an error message
   */
  error(message: string, data?: any, context?: { orderId?: string; chain?: string; txHash?: string }): void {
    this.log(LogLevel.ERROR, message, data, context);
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: any, context?: { orderId?: string; chain?: string; txHash?: string }): void {
    if (level < this.logLevel) {
      return;
    }

    const logEntry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      orderId: context?.orderId,
      chain: context?.chain,
      txHash: context?.txHash
    };

    // Add to internal log storage
    this.logs.push(logEntry);
    
    // Remove old logs if we exceed max
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Output to console
    this.outputToConsole(logEntry);
  }

  /**
   * Output log entry to console with formatting
   */
  private outputToConsole(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const levelStr = LogLevel[entry.level].padEnd(5);
    
    let contextStr = '';
    if (entry.orderId) contextStr += ` [${entry.orderId}]`;
    if (entry.chain) contextStr += ` [${entry.chain}]`;
    if (entry.txHash) contextStr += ` [${entry.txHash.substring(0, 8)}...]`;

    const baseMessage = `${timestamp} ${levelStr}${contextStr} ${entry.message}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(`🐛 ${baseMessage}`, entry.data || '');
        break;
      case LogLevel.INFO:
        console.info(`ℹ️ ${baseMessage}`, entry.data || '');
        break;
      case LogLevel.WARN:
        console.warn(`⚠️ ${baseMessage}`, entry.data || '');
        break;
      case LogLevel.ERROR:
        console.error(`❌ ${baseMessage}`, entry.data || '');
        break;
    }
  }

  /**
   * Get recent logs
   */
  getRecentLogs(count: number = 100): LogEntry[] {
    return this.logs.slice(-count);
  }

  /**
   * Get logs for a specific order
   */
  getOrderLogs(orderId: string): LogEntry[] {
    return this.logs.filter(log => log.orderId === orderId);
  }

  /**
   * Get logs for a specific chain
   */
  getChainLogs(chain: string): LogEntry[] {
    return this.logs.filter(log => log.chain === chain);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs to JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Create singleton logger instance
export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
);