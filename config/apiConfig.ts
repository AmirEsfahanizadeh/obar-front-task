export async function apiFetch<T>(
    endpoint: string,
    {
      method = 'GET',
      body,
      headers = {},
    }: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
      body?: any,
      headers?: Record<string, string>,
    } = {}
  ): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
      ...headers,
    };
  
    const res = await fetch(`https://stage.achareh.ir/api/karfarmas/address${endpoint ? '/' + endpoint : ''}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
  
    const contentType = res.headers.get('content-type');
  
    const rawText = await res.text(); // read once
  
    if (!res.ok) {
      console.error('[API Error]', res.status, rawText);
      throw new Error(`API ${res.status}: ${rawText}`);
    }
  
    // Only try to parse JSON if it's the correct content-type
    if (contentType && contentType.includes('application/json')) {
      try {
        return JSON.parse(rawText);
      } catch (e) {
        console.error('[JSON Parse Error]', rawText);
        throw new Error('Invalid JSON response');
      }
    }
  
    console.error('[Unexpected Response Type]', contentType, rawText);
    throw new Error('Expected JSON, but got something else');
  }
  