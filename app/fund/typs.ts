export type TFund = {
    code: string
    SHORTNAME: string
    FTYPE: string
    RISKLEVEL: string
    RZDF: string
    DWJZ: string
    CYCLE: string
    SYL_1N_NUMBER: number
    sh: {
        rateSection: string
        feeRate: string
    }[],
    RATE: string,
}