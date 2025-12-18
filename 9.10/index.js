const getCar = (carName) => {
    const cars = {
        mercedes: {
            name: "Mercedes",
            doors: 4,
            wheels: 4,
            hp: 220,
            isStarted: false,
        },
        bmw: {
            name: "BMW",
            doors: 4,
            wheels: 4,
            hp: 330,
            isStarted: false,
        },
        audi: {
            name: "AUDI",
            doors: 4,
            wheels: 4,
            hp: 267,
            isStarted: false,
        },
    };
    

    if (cars[carName]) {

        console.log(cars[carName]);
        return cars[carName];
    } else {

        console.log("Авто не найдено");
        return "Авто не найдено";
    }
};