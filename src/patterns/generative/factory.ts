interface IInsurance {
	id: number;
	status: string;
	setVehicle(vehicle: string): void;
	submit(): Promise<boolean>;
}

class TFInsurance implements IInsurance {
	id: number;
	status: string;

	private vehicle: string;
	setVehicle(vehicle: string): void {
		this.vehicle = vehicle;
	}
	async submit(): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}

class ABInsurance implements IInsurance {
	id: number;
	status: string;

	private vehicle: string;
	setVehicle(vehicle: string): void {
		this.vehicle = vehicle;
	}
	async submit(): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}

abstract class InsuranceFactory {
	abstract createInsurance(vehicle: string): IInsurance;

	// Реальные методы, используемые в классах фабрик
}

class TFInsuranceFactory extends InsuranceFactory {
	createInsurance(vehicle: string): TFInsurance {
		const insurance = new TFInsurance();
		insurance.setVehicle(vehicle);

		return insurance;
	}
}

class ABInsuranceFactory extends InsuranceFactory {
	createInsurance(vehicle: string): ABInsurance {
		const insurance = new ABInsurance();
		insurance.setVehicle(vehicle);

		return insurance;
	}
}

// Альтернативная реализация
const INSURANCE_TYPE = {
	tf: TFInsurance,
	ab: ABInsurance,
};

type InsuranceType = typeof INSURANCE_TYPE;

class InsuranceFactoryAlt {
	createInsurance<T extends keyof InsuranceType>(type: T) {
		return INSURANCE_TYPE[type];
	}
}

const insF = new InsuranceFactoryAlt();
const ins = new (insF.createInsurance('tf'))();
