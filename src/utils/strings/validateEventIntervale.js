import { BadRequestError } from "../errors/index.js";
const validateEventIntervale= (startAt, endAt) => {
    if (!startAt && !endAt) {
        throw new BadRequestError({
            message: "start Date and End Date is required",
            code: "E2_"
        })
        
    }

    const startDate= new Date(startAt);
    const endDate= new Date(endAt);
    const now= new Date();

    if (startDate > endDate || startDate < now) {
        throw new BadRequestError({
            message: "startDate must be greater than end Date or start Date greater than now",
            code: "E2_"
        })
    }

    return {startAt: startDate, endAt: endDate}
};

export {validateEventIntervale}