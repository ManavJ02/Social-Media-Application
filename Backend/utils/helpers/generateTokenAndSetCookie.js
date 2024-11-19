import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  // Creating a JWT Token by signing the userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  // Set the generated token as a cookie in the http response
  res.cookie("jwt", token, {
    httpOnly: true, // Restricts access to the cookie from JavaScript (prevents XSS attacks)
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // Helps prevent Cross-Site Request Forgery (CSRF) attacks by only allowing cookies in first-party contexts
  });

  return token;
};

export default generateTokenAndSetCookie;
