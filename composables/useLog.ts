import { ref, readonly, toRaw } from 'vue';

interface LogEntry {
  id: number;
  timestamp: Date | null;
  message: string | object;
}

// Create state variables in the module scope. They will act as singletons.
const logs = ref<LogEntry[]>([]);
const logIdCounter = ref<number>(0);

export const useLog = () => {

  const addLog = (...messages: any[]) => {
    const timestamp = new Date();
    const newEntries: LogEntry[] = messages.map((message, index) => ({
      id: logIdCounter.value++,
      timestamp: (index === 0) ? timestamp : null,
      message: typeof message === 'object' && message !== null ? 
        JSON.parse(JSON.stringify(toRaw(message))) : message,
    }));
    logs.value = [...newEntries, ...logs.value];
  };

  const clearLogs = () => {
    logs.value = [];
  }

  return {
    logs: readonly(logs),
    addLog,
    clearLogs,
  };
}; 