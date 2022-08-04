export const getInterestGrossValue = (interest) => {
    return interest.value - interest.discountPercent * interest.value / 100
}

export const getProcedureNetValue = (interest, taxRate) => {
    return Math.round(getInterestGrossValue(interest) / (1 + taxRate / 100))
}

export const getInterestNetValue = (interest, interestRate, taxRate) => {
    return getProcedureNetValue(interest, taxRate) * interestRate / 100
}