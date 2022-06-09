export type ActionOption = {
    onFinish?: (data?: Record<string, any>) => void;
    onAfterError?: (data?: Record<string, any>) => void;
    key?: string;
    alternateKey?: string;
    uiKey?: string;
    params?: Record<string, any>;
  };