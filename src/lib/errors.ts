export function getErrorMessage(error: unknown, fallback: string) {
  const errorWithResponse = error as {
    response?: {
      data?: ErrorResponse;
    };
    message?: string;
  };

  return (
    errorWithResponse.response?.data?.message ||
    errorWithResponse.response?.data?.error?.message ||
    errorWithResponse.message ||
    fallback
  );
}
