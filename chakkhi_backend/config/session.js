// export const cookie = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   maxAge: 3600000,
// };

const sessionConfig = {
  cookie: {
    httpOnly: true,
    secure: false, // Allow cookie over HTTP for testing (not recommended in production)
    maxAge: 432000000, // 5 days in milliseconds
    path: "/", // Ensure this is set if your cookie is not showing
    domain: "localhost",
  },
};

export default sessionConfig; // Default export
