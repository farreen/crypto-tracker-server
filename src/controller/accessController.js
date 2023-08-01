import userRegister from '../model/accessModel.js'
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body.userData;
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            res.status(400).send("cannot save blank data");
        } else {
            const salt = await bcrypt.genSalt();
            console.log("salt", salt)
            const hashedPassword = await bcrypt.hash(password, salt)
            const newuser = await userRegister.create({ username, email, password: hashedPassword })
            console.log("newuser..", newuser)
            const savedAdmin = await newuser.save();
            console.log("savedAdmin", savedAdmin);
            res.status(200).send("successfully added")
        }
    } catch (error) {
        console.log("Error", error)
        res.status(500).send("Error", error.message);
    }
}



export const login = async (req, res) => {
    try {
        console.log("adminLogin", req.body)
        const { email, password } = req.body.obj
        const user = await userRegister.findOne({ email: email})
        console.log("userLog", user);
        if (!user) {
            res.status(400).send("User doesnot exist");
        } else {
            const dbpassword = await bcrypt.compare(password, user.password)
            console.log("dbpassword", dbpassword);
            if (!dbpassword) {
                res.status(400).send("username and password doesnot exist");
            } else {
                console.log("matched..")
                res.status(200).send(user);
            }
        }
    } catch (err) {
        res.status(400).send("error", err)
    }
}

