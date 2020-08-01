
export const configMandatory =
  <T>(key: string) => {
    if (process.env[key] === undefined || process.env[key] === null) {
      throw new Error(`Environment variable required: ${key}`);
    }
    const returnValue: T = process.env[key] as any;
    return returnValue;
  };

export const configOptional =
  <T>(key: string, defaultValue?: T) => {
    if (process.env[key] === undefined || process.env[key] === null) {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return undefined;
    }
    const returnValue: T = process.env[key] as any;
    return returnValue;
  };
