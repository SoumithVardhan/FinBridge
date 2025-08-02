// Type utilities for handling null/undefined conversions
export type NullToUndefined<T> = {
  [K in keyof T]: T[K] extends null ? undefined : T[K];
};

// Helper function to convert null values to undefined
export const nullToUndefined = <T>(obj: T): NullToUndefined<T> => {
  if (obj === null) return undefined as any;
  if (typeof obj !== 'object') return obj as any;
  if (Array.isArray(obj)) return obj.map(nullToUndefined) as any;
  
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = nullToUndefined(obj[key]);
    }
  }
  return result;
};

// Type guard to check if value is not null or undefined
export const isNotNullOrUndefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

// Safe string conversion that handles null/undefined
export const safeString = (value: string | null | undefined): string => {
  return value ?? '';
};

// Safe optional string conversion
export const safeOptionalString = (value: string | null | undefined): string | undefined => {
  return value === null ? undefined : value;
};
