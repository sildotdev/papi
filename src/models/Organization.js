class OrganizationRole {
    constructor(id, name, organization) {
        this.id = id;
        this.name = name;
        this.organization = organization;
        this.permissions = [];
    }
}

class OrganizationMember {
    constructor(organization, character, role) {
        this.organization = organization;
        this.character = character;
        this.role = role;
    }
}

class Organization {
    constructor(name, owner) {
        this.name = name;
        this.owner = owner; // Character

        this.members = [];
        this.roles = {};

        this.roles["owner"] = new OrganizationRole("owner", 'Owner', this);
        this.roles["admin"] = new OrganizationRole("admin", 'Admin', this);
        this.roles["member"] = new OrganizationRole("member", 'Member', this);
        this.roles["recruit"] = new OrganizationRole("recruit", 'Recruit', this);

        this.addMember(owner, "owner");
    }

    addMember(character, roleID) {
        let role = this.roles[roleID];

        if (!role) {
            throw new Error('Invalid role ID.');
        }

        this.members.push(new OrganizationMember(this, character, role));
    }

    removeMember(character) {
        // Disallow removing the owner
        if (character === this.owner) {
            throw new Error('Cannot remove the owner from the organization.');
        }

        this.members = this.members.filter(m => m.character !== character);
    }

    disband() {
        // @TODO
    }
}

module.exports = Organization;