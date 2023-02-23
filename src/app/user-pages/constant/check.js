const loginType = sessionStorage.getItem("loginType");
const check =
  loginType == "Super-Admin" || loginType == "Admin"
    ? ""
    : (window.location.href = "/");
export { check };
