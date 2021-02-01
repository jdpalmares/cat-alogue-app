import http from "../http-common";

//CATalogue service 
//(In case of CRUD improvement)

//Get all breeds (no equivalent in the API)
const getAll = () => {
  return http.get("//api.thecatapi.com/v1/");
};

//Create a breed (no equivalent in the API)
const create = data => {
  return http.post("//api.thecatapi.com/v1/", data);
};

//Update a certain breed (no equivalent in the API)
const update = (id, data) => {
  return http.put(`//api.thecatapi.com/v1/${id}`, data);
};

//Remove a certain breed (no equivalent in the API)
const remove = id => {
  return http.delete(`//api.thecatapi.com/v1/${id}`);
};

//Remove all breeds (no equivalent in the API)
const removeAll = () => {
  return http.delete(`//api.thecatapi.com/v1/`);
};

//Search certain breed (Not currently used)
const searchByBreed = breed => {
  return http.get(`//api.thecatapi.com/v1/breeds/search?q=${breed}`);
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
  searchByBreed
};
