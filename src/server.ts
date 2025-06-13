function welcome(name: string) {
  console.log("hello");
  console.log("naman");
  const user = {
    name: "naman",
  };
  const fname = user.name;
  return name + fname;
}
welcome("naman");
