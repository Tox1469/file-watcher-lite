// file-watcher-lite: watch fs with debounce
import * as fs from 'fs';
import * as path from 'path';

export interface WatchOptions {
  debounce?: number;
  recursive?: boolean;
}

export type WatchHandler = (event: string, file: string) => void;

export class Watcher {
  private watchers: fs.FSWatcher[] = [];
  private timers = new Map<string, NodeJS.Timeout>();
  private debounce: number;
  private handler: WatchHandler;

  constructor(handler: WatchHandler, private opts: WatchOptions = {}) {
    this.debounce = opts.debounce ?? 100;
    this.handler = handler;
  }

  add(target: string) {
    const stat = fs.statSync(target);
    const isDir = stat.isDirectory();
    const w = fs.watch(
      target,
      { recursive: isDir && (this.opts.recursive ?? true) },
      (event, filename) => {
        const file = filename ? path.join(isDir ? target : path.dirname(target), filename.toString()) : target;
        this.trigger(event, file);
      }
    );
    this.watchers.push(w);
    return this;
  }

  private trigger(event: string, file: string) {
    const existing = this.timers.get(file);
    if (existing) clearTimeout(existing);
    this.timers.set(
      file,
      setTimeout(() => {
        this.timers.delete(file);
        this.handler(event, file);
      }, this.debounce)
    );
  }

  close() {
    this.watchers.forEach((w) => w.close());
    this.watchers = [];
    this.timers.forEach((t) => clearTimeout(t));
    this.timers.clear();
  }
}
