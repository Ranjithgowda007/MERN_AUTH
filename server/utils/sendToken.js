export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // send only over HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // allow cross-site cookies in production
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};