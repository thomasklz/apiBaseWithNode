import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_KEY } from "../config/config.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ['id', 'user', 'email', 'typeusers_id']
    },{where: {state:true}});
  
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({where:{id:req.params.id}});
    if(!user){
      res.status(404).json({message: "user not found"});
    }
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createUsers = async (req, res) => {
  try {
    const { user, email, password } = req.body;
    if (!(user ||  email ||  password)) {
      res.status(400).json({ message: "all input is required" });
    }
    // check if email already exist
    // Validate if email exist in our database
    const oldUser = await UserModel.findOne({ where: { email: email } });
    if (oldUser) {
      return res.status(409).json("email already exist");
    }
    //Encrypt user password
   const encryptedPassword = await bcrypt.hash(password.toString(),10);
    // Create user in our database
    const users = await UserModel.create({
      user,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      typeusers_id:1
    });
    // Create token
    const token = jwt.sign({ user_id: users.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    // save user token
    // users.token = token;
    res.status(201).json({ users, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUsers = async (req, res) => {
  const { user } = req.body;
  if (!(user)) {
    res.status(400).json({ message: "user is required" });
  }
  const userD = await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,user:user});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateUsersEmail = async (req, res) => {
  const { email } = req.body;
  if (!(email)) {
    res.status(400).json({ message: "email is required" });
  }
  const oldUser = await UserModel.findOne({ where: { email: email } });
  if (oldUser) {
    return res.status(409).json("email already exist");
  }
  const userD = await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,email:email});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const updateUsersPassword = async (req, res) => {
  const { password } = req.body;
  if (!(password)) {
    res.status(400).json({ message: "password is required" });
  }
  const userD = await UserModel.findOne({where:{id:req.params.id}});
  if(userD){
    userD.set({...userD,password:password});
      await userD.save();
      res.status(200).json({ message: "update" });
  }else{
      res.status(404).json({message: "user not found"});
  }
};
export const deleteUsers = async (req, res) => {
  const user = await UserModel.findOne({ where: { id: req.params.id } });
  if (user) {
    user.set({ ...user, state: false });
    await user.save();
    res.status(200).json({ message: "delete" });
  } else {
    res.status(404).json({ message: "type not found" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({message:"All input is required"});
    }
    const user = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });
     // Check if user exists
     if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
   // If everything is valid, generate a token
    const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });
      let dataUser={
          id:user.id,
          user:user.user,
          email:user.email,
          typeusers_id:user.typeusers_id
      }
      res.status(200).json({ dataUser, token: token });
  } catch (err) {
    console.error("Login:", err.message );
    res.status(500).json({ error: err.message });
  }
};
export const logout = async (req, res)=>{

}
export const refresh = (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
	if (!token) {
		return res.status(401).end()
	}
	var payload
	try {
		payload = jwt.verify(token, 'secret')
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end()
	}
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}
