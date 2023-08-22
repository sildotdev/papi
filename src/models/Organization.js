class Organization {
    constructor(name, owningCharacter) {
        this.name = name;
        this.owningCharacter = owningCharacter;
        this.members = [];
    }
}

module.exports = Organization;