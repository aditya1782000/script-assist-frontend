class ValidationClass {
  errors = [];

  messages = (attribute: string, rule: string) => {
    switch (rule) {
      case "email":
        return "Email is not valid";
      case "must be 8-15 characters long and contain at least one uppercase, one digit, and one special character":
        return ``;
      default:
    }
  };

  fieldIsEmail = (field: string, name: string, rule: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(field)) {
      return this.messages(name, rule);
    }
  };

  isValidPassword = (field: string, name: string, rule: string) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/;

    if (!regex.test(field)) {
      return this.messages(name, rule);
    }
  };
}

export default new ValidationClass();
