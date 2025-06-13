function welcome(name: string) {
    console.log("hello")

    const user = {
        name: "naman",
    }
    const fname = user.name
    return name + fname
}
welcome("naman")