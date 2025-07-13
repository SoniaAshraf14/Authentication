import User from "../models/User.js";

// Pakistani number validation
const isValidPakistaniNumber = (number) => /^03[0-9]{9}$/.test(number);

// SIGNUP CONTROLLER
export const signupUser = async (req, res) => {
  try {
    const { email, password, gender, dob, phone } = req.body;

    if (!isValidPakistaniNumber(phone)) {
      return res.status(400).json({ error: "Invalid Pakistani phone number." });
    }

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const hadBirthday =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!(age > 15 || (age === 15 && hadBirthday))) {
      return res.status(400).json({ error: "You must be at least 15 years old." });
    }

    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(400).json({ error: "Email or phone already exists." });
    }

    const coverPhoto = req.files?.coverPhoto?.[0]?.filename || "";
    const profileImage = req.files?.profileImage?.[0]?.filename || "";

    let base = email.split("@")[0];
    let username = base;
    let counter = 1;
    while (await User.findOne({ username })) {
      username = `${base}${counter++}`;
    }

    const newUser = new User({
      email,
      password,
      gender,
      dob,
      phone,
      coverPhoto,
      profileImage,
      username,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!", username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE USERNAME CONTROLLER
export const updateUsername = async (req, res) => {
  const { userId } = req.params;
  const { newUsername } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const now = new Date();
    const lastUpdated = user.usernameUpdatedAt;

    // Only allow change if it's the first time or after 24 hrs
    if (lastUpdated && now - new Date(lastUpdated) < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ error: "Username can only be updated once every 24 hours." });
    }

    const isTaken = await User.findOne({ username: newUsername });
    if (isTaken) {
      return res.status(400).json({ error: "Username already taken." });
    }

    user.username = newUsername;
    user.usernameUpdatedAt = now;
    await user.save();

    res.json({ message: "Username updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET USER PROFILE CONTROLLER
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updateUserPhoto = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.files?.coverPhoto?.[0]) {
      user.coverPhoto = req.files.coverPhoto[0].filename;
    }
    if (req.files?.profileImage?.[0]) {
      user.profileImage = req.files.profileImage[0].filename;
    }

    await user.save();

    res.json({ message: "Photo(s) updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

