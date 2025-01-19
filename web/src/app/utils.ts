export function sanatizeFields(fields: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(fields).filter(([, v]) => v));
}

export function formatDate(date: Date | string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (typeof date === 'string' ? new Date(date) : date).toLocaleDateString(
    undefined,
    options
  );
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
