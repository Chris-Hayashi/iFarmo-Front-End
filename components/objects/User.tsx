class User {
    'name' : string;
    'email': string;
    'contactInfo': string;
    'role': string;
    'bio': string;

    constructor(...args: any[]) {
        if (args.length === 1) {
            this.name = args[0].name;
            this.email = args[0].email;
            this.contactInfo = args[0].contactInfo;
            // if (args[0].role === 'farmer')
            //     this.role = 'farmer';
            // else if (args[0].role === 'worker')
            //     this.role = 'Worker';
            this.role = args[0].role;
            this.bio = args[0].bio;
        }
    };

    setName(name : string) {
        this.name = name;
        return this;
    };

    setEmail(email : string) {
        this.email = email;
        return this;
    };

    setContactInfo(contactInfo : string) {
        this.contactInfo = contactInfo;
        return this;
    };

    setRole(role : string) {
        this.role = role;
        return this;
    };

    setBio(bio : string) {
        this.bio = bio;
        return this;
    };
}

export default User;