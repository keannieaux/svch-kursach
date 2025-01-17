module.exports = class UserDto {
    email;
    id;
    firstname;
    lastname;
    roleId;
    delivery_address;
    phone_number;

    constructor(model) {
        this.email = model.email;
        this.id = model._id; 
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.roleId = model.role;
        this.delivery_address = model.delivery_address;
        this.phone_number = model.phone_number;
    }

    toObject() {
        return {
            email: this.email,
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            roleId: this.roleId,
            delivery_address: this.delivery_address,
            phone_number: this.phone_number
        };
    }
}
