export function isSuccess(response) {
  // 200: return HTTP request successfully
  // 201: return when creating successfully
  return response.status == 200 || response.status == 201
}

