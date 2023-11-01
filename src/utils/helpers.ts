export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function sortUsersByFirstName(users: any[], activeOrder: string) {
  return [...users].sort((a, b) => {
    const firstNameA = a.name.first;
    const firstNameB = b.name.first;

    if (activeOrder === "Asc") {
      return firstNameA.localeCompare(firstNameB);
    } else if (activeOrder === "Desc") {
      return firstNameB.localeCompare(firstNameA);
    } else {
      return 0;
    }
  });
}
