const express = require("express");
const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });
require("colors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const connectDb = require("../config/connectDb");
const ErrorHandler = require("./midlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const UsersModel = require("./models/usersModel");
const RolesModel = require("./models/rolesModel");

const authMiddleware = require("./midlewares/authMiddleware");



app.use("/api/v1", require("./routes/filmsRoutes"));

//реєстрація - створення нового користувача в базі
//аутентифікація - перевірка данних які надав користувач і порівняв з тим, що зберігається в базі
//авторизація - перевірка прав доступа
//логаут - вихід користувача з системи
app.post(
    "/register",
    asyncHandler(async (req, res) => {
        //1 отримую і валідую дані від користувача
        //2 шукаємо користувача в базі данних
        //3 якщо знайшли то повідомляємо що такий користувач є
        //4 якщо не знайшли то хешуємо пароль
        //5 зберігаю користувача в базу

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Provide all requare fields!");
        }

        const candidat = await UsersModel.findOne({ email });
        if (candidat) {
            res.status(400);
            throw new Error(" user already exists!");
        }
        const hashPasword = bcript.hashSync(password, 5);
        const roles = await RolesModel.findOne({ value: "ADMIN" });
        const user = await UsersModel.create({
            ...req.body,
            password: hashPasword,
            roles: [roles.value],
        });
        res.status(201).json({ code: 201, data: { email: user.email } });
    })
);

app.post(
    "/login",
    asyncHandler(async (req, res) => {
        //1 отримую і валідую дані від користувача
        //2 шукаємо користувача в базі данних і розшифровуємо пароль
        //3 якщо не знайшли або не розшифревали пароль то пишемо invalid login or password
        //4 якщо все ок то генеруємо токин
        //5 зберігаю токин в базу данних

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("Provide all requare fields!");
        }

        const user = await UsersModel.findOne({ email });

        const validPassword = user
            ? bcript.compareSync(password, user.password)
            : null;

        if (!user || !validPassword) {
            res.status(400);
            throw new Error("invalid login or password!");
        }
        const token = generateToken({
            friends: ["maria", "kocty", "vetal"],
            id: user._id,
            roles: user.roles,
        });

        user.token = token;
        await user.save();

        res.status(200).json({
            code: 200,
            data: { email: user.email, token: user.token },
        });
    })
);

app.get(
    "/logout",
    authMiddleware,
    asyncHandler(async (req, res) => {
        console.log(req.user.id);
        const user = await UsersModel.findById(req.user.id);
        user.token = null;
        await user.save();
        res.status(200).json({ code: 200, message: "logout ok" });
    })
);

function generateToken(data) {
    const payload = { ...data };
    return jwt.sign(payload, "cat", { expiresIn: "8h" });
}

app.use(ErrorHandler);
connectDb();
app.listen(process.env.PORT, () => {
    console.log(
        `Server is running, port ${process.env.PORT}!`.green.italic.bold
    );
});
