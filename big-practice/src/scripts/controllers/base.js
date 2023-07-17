export async function proc(handle) {
  try {
    return await handle;
  } catch (error) {
    console.error(error);
    // TODO: handle error application
  }
}
