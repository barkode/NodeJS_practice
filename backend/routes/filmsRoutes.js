const filmsRoutes = require("express").Router();
const filmsCtrl = require("../controllers/Films");

const rolesMiddleware = require("../midlewares/rolesMiddleware");
const authMiddleware = require("../midlewares/authMiddleware");
// add film
// отримати всі
// отримати один фільм
// оновити фільм
// видалити фільм
filmsRoutes.post(
    "/films",
    (req, res, next) => {
        console.log("joi");
        next();
    },
    filmsCtrl.add
);

["ADMIN", "MODERATOR", "USER", "CTO"];

filmsRoutes.get(
    "/films",
    authMiddleware,
    rolesMiddleware(["MODERATOR", "ADMIN"]),
    filmsCtrl.getAll
);
filmsRoutes.get("/films/:id", filmsCtrl.getById);
filmsRoutes.put("/films/:id", filmsCtrl.update);
filmsRoutes.delete("/films/:id", filmsCtrl.remove);
module.exports = filmsRoutes;
// Cannot GET /api/v1/films
