const config = module.exports;

const userRoles = config.userRoles = {
  user: 1,
  admin: 4,
};

config.accessLevels = {
  user: [userRoles.admin, userRoles.user],
  admin: [userRoles.admin],
};
