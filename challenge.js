class Building {
    constructor(name, street_address, city, state, zip_code) {
        this.name = name;
        this.street_address = street_address;
        this.city = city;
        this.state = state;
        this.zip_code = zip_code;
        this.units = [];
    }

    get_monthly_income() {
        const total = this.units.reduce((acc, unit) => {
            acc += unit.is_occupied ? unit.monthly_rent : 0;
            return acc;
        }, 0);

        return total;
    }

    get_monthly_expenses() {
        const total = this.units.reduce((acc, unit) => {
            acc += unit.monthly_expenses;
            return acc;
        }, 0);
        return total;
    }

    get_monthly_profit() {
        return this.get_monthly_income() - this.get_monthly_expenses();
    }

    get_units() {
        return this.units;
    }

    add_unit(unit) {
        const unit_number = this.determine_unit_number();
        this.units.push({ ...unit, number: unit_number });
    }
    remove_unit(unit) {
        this.units = this.units.filter((u) => u.number !== unit.number);
    }

    determine_unit_number() {
        if (this.units.length === 0) return 1;

        const existingUnitNumber = this.units.map((unit) => unit.number);
        const existingUnitsSet = new Set(existingUnitNumber);

        const maxNumber = Math.max(...existingUnitsSet);
        let newUnitNumber = null;

        for (let i = 1; i <= maxNumber; i++) {
            if (!existingUnitsSet.has(i)) {
                newUnitNumber = i;
                break;
            }
        }

        if (newUnitNumber === null) {
            newUnitNumber = maxNumber + 1;
        }

        return newUnitNumber;
    }
}

class Unit {
    constructor(type, monthly_rent, monthly_expenses) {
        this.type = type;
        this.number = null;
        this.monthly_rent = monthly_rent;
        this.monthly_expenses = monthly_expenses;
        this.is_occupied = false;
    }

    occupy() {
        this.is_occupied = true;
    }

    vacate() {
        this.is_occupied = false;
    }
}
