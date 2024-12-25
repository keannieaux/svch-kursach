module.exports = class UserDto {
    email;
    id;
    firstname;
    lastname;
    roleId;
    delivery_address;
    phone_number

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.roleId = model.roleId;
        this.delivery_address = model.delivery_address;
        this.phone_number = model.phone_number
    }
}