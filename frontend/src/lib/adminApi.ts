const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? "/api"
    : process.env.NODE_ENV === "production"
    ? "http://31.97.67.77:8000/api"
    : "http://127.0.0.1:8000/api");

async function handleResponse(res: Response, defaultErrorMsg: string) {
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // Non-JSON response
  }

  if (!res.ok) {
    if (res.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("craft_admin_token");
        localStorage.removeItem("craft_admin_user");
      }
    }
    let msg = defaultErrorMsg;
    if (data) {
      if (data.errors && typeof data.errors === 'object') {
        const errorList = Object.values(data.errors).flat();
        if (errorList.length > 0) {
          msg = String(errorList[0]);
        }
      } else if (data.message) {
        msg = data.message;
      }
    }
    throw new Error(msg);
  }

  return data;
}

export async function adminCheckAuth(token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Sesi autentikasi telah berakhir');
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await handleResponse(res, 'Login failed');
}

export async function adminGetDashboard(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to fetch dashboard data');
}

export async function adminUpdateProfile(token: string, profileData: any) {
  const payload = { ...profileData };
  if (payload.rating_score !== undefined && payload.rating_score !== null) {
    const parsed = parseFloat(String(payload.rating_score).replace(',', '.'));
    payload.rating_score = isNaN(parsed) ? 0 : parsed;
  }

  const res = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return await handleResponse(res, 'Failed to update profile');
}

// Services CRUD
export async function adminSaveService(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/services/${id}` : `${API_BASE_URL}/admin/services`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save service');
}

export async function adminDeleteService(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete service');
}

// Experiences CRUD
export async function adminSaveExperience(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/experiences/${id}` : `${API_BASE_URL}/admin/experiences`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save experience');
}

export async function adminDeleteExperience(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/experiences/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete experience');
}

// Projects Showcase CRUD
export async function adminSaveProjectShowcase(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/projects-showcase/${id}` : `${API_BASE_URL}/admin/projects-showcase`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save project showcase');
}

export async function adminDeleteProjectShowcase(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/projects-showcase/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete project showcase');
}

// Portfolio Projects CRUD
export async function adminSavePortfolio(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/portfolio/${id}` : `${API_BASE_URL}/admin/portfolio`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save portfolio project');
}

export async function adminDeletePortfolio(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete portfolio project');
}

// Certificates CRUD
export async function adminSaveCertificate(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/certificates/${id}` : `${API_BASE_URL}/admin/certificates`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save certificate');
}

export async function adminDeleteCertificate(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/certificates/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete certificate');
}

// Brand Logos CRUD
export async function adminFetchBrandLogos(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/brand-logos`);
  return await handleResponse(res, 'Failed to fetch brand logos');
}

export async function adminSaveBrandLogo(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/brand-logos/${id}` : `${API_BASE_URL}/admin/brand-logos`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save brand logo');
}

export async function adminDeleteBrandLogo(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/brand-logos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete brand logo');
}

// Design Tools CRUD
export async function adminFetchDesignTools(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/design-tools`);
  return await handleResponse(res, 'Failed to fetch design tools');
}

export async function adminSaveDesignTool(token: string, data: any, id?: number) {
  const url = id ? `${API_BASE_URL}/admin/design-tools/${id}` : `${API_BASE_URL}/admin/design-tools`;
  const method = id ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await handleResponse(res, 'Failed to save design tool');
}

export async function adminDeleteDesignTool(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/design-tools/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete design tool');
}

// Messages
export async function adminGetMessages(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to fetch messages');
}

export async function adminDeleteMessage(token: string, id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return await handleResponse(res, 'Failed to delete message');
}

// Upload
export async function adminUploadImage(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    body: formData,
  });
  const data = await handleResponse(res, 'Failed to upload image');
  return data.url;
}
