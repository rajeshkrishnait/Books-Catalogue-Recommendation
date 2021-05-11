var UserProfile = (function () {
  var full_name = "";
   var id="";
   var email_id="";var password="";
  var getName = function () {
    return full_name; // Or pull this from cookie/localStorage
  };
  var getId = function () {
    return id; // Or pull this from cookie/localStorage
  };
  var getEmail = function () {
    return email_id; // Or pull this from cookie/localStorage
  };
  var getPassword = function () {
    return password; // Or pull this from cookie/localStorage
  };
  var setName = function (name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };
  var setPassword = function (pa) {
    password = pa;
    // Also set this in cookie/localStorage
  };
  var setId = function (ide) {
    id = ide;
    // Also set this in cookie/localStorage
  };
  var setEmail = function (em) {
    email_id = em;
    // Also set this in cookie/localStorage
  };

  return {
    getName: getName,
    setName: setName,
    getEmail: getEmail,
    setEmail: setEmail,
    getId: getId,
    setId: setId,
    getPassword: getPassword,
    setPassword: setPassword,
  };
})();

export default UserProfile;
