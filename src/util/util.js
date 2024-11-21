export function validateExpense(expense) {
  const required = [];
  if (!expense.name) {
    required.push("name");
  } 
  if (!expense.amount) {
    required.push("amount");
  }
  if (!expense.date) {
    required.push("date");
  }
  if (required.length === 0) {
    return null;
  }
  return required.join(", ").concat(" is required")[0].toUpperCase() + required.join(", ").concat(" is required").slice(1);
}

export function validateUser(user) {
  if (!user.email) {
    return "Email is required";
  }
  if (!user.password) {
    return "Password is required";
  }
  return null;
}