interface ServiceWorkerRegistration {
  readonly sync: SyncManager;
}
interface SyncManager {
  register(tag: string): Promise<void>;
  getTags(): Promise<string[]>;
  unregister(tag: string): Promise<boolean>;
  onSync: (tag: string) => void;
}
