// Simple logger utility for frontend
class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.VITE_NODE_ENV === 'development' || 
                        import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true';
  }

  private formatMessage(level: string, message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    console.log(`${prefix} ${message}`, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.formatMessage('info', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.formatMessage('warn', message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.formatMessage('error', message, ...args);
    // In production, you might want to send errors to a service
    if (!this.isDevelopment) {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(new Error(message));
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.isDevelopment) {
      this.formatMessage('debug', message, ...args);
    }
  }
}

export const logger = new Logger();
