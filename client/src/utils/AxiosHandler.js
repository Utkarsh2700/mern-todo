const axiosHandler = async function (apiCall) {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.log("An error occoured", error);
    throw error;
  }
};
export default axiosHandler;
