export async function checking(handle) {
  try {
    return await handle;
  } catch (error) {
    // TODO: handle error application
    console.error(error);
  }
}
