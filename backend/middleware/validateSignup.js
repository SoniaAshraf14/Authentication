export const validateSignup = (req, res, next) => {
  const { email, password, gender, dob, phone } = req.body;

  // Basic presence checks
  if (!email || !password || !gender || !dob || !phone) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // Phone validation for Pakistani number
  const phoneRegex = /^03[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid Pakistani phone number." });
  }

  // Password rules
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long." });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({ error: "Password must include at least one number." });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "Password must include an uppercase letter." });
  }
  if (!/[@$!%*?#&]/.test(password)) {
    return res.status(400).json({ error: "Password must include a special character." });
  }

  // Age check (must be at least 15 years old)
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const hadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  if (!(age > 15 || (age === 15 && hadBirthday))) {
    return res.status(400).json({ error: "You must be at least 15 years old." });
  }

  next(); // ✅ All validations passed, go to controller
};
