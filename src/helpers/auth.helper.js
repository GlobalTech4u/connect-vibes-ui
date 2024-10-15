const logout = () => {
  localStorage.removeItem("user");
};

export { logout };
