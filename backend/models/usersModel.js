const { Schema, model } = require("mongoose");
const usersSchema = new Schema({
    email: { type: String, required: [true, "db:email is required"] },
    password: { type: String, required: [true, "db:password is required"] },
    name: { type: String, default: "Bred Pit" },
    token: { type: String, default: null },
    roles: [{ type: String, ref: "roles" }],
});
module.exports = model("user", usersSchema);
