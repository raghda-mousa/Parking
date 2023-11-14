let envType = process.env.ENVIRONMENT || 'development';
envType = envType === 'local' ? 'development' : envType;

export const logi = (fileName: string) => {
  return { info: console.log, error: console.error }
};
