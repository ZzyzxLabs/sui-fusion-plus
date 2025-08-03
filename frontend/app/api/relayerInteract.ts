const BASE_URL = 'http://localhost:8000/api/v1/relayer';

// Helper function to make API calls
export async function apiCall(method: string, endpoint: string, data: any = null) {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Something went wrong');
    }

    return { success: true, data: responseData, status: response.status };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status || 500
    };
  }
}
