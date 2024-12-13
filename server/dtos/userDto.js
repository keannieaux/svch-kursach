module.exports = class UserDto {
    email;
    id;
    firstname;
    lastname;
    roleId

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.roleId = model.roleId;
    }
}