import React from "react";
import logo from "../assets/logo.svg"
import dollar from "../assets/icon-dollar.svg"
import person from "../assets/icon-person.svg"
import Input from "../components/Input";
interface DynamicKey {
    [key: string]: number | string
}
interface Form extends DynamicKey {
    bill: string,
    tip: string,
    customTip: string,
    people: string,
    eachTip: number,
    eachPay: number
}
const useForm = () => {
    const initData = {
        bill: "",
        tip: "5",
        customTip: "",
        people: "",
        eachTip: 0,
        eachPay: 0
    }
    const [data, setData] = React.useState<Form>(initData)
    const [errors, setErrors] = React.useState<Pick<Form, "bill" | "people" | "tip" | "customTip">>({ bill: "", tip: "", people: "", customTip: "" })
    const timer = React.useRef<number | null>(null)
    const validate = React.useCallback((name: string, value: string) => {
        if (!value) {
            setData((data) => ({ ...data, [name as keyof Form]: 0 }))
            return false
        }
        if (!(/^\d+$/).test(value)) {
            setErrors((errors) => ({ ...errors, [name as keyof Form]: "Invalid value" }))
            setData((data) => ({ ...data, [name as keyof Form]: value }))
            return false
        }
        if (Number.isNaN(parseFloat(value)) && parseFloat(value) <= 0) {
            setErrors((errors) => ({ ...errors, [name as keyof Form]: "Can’t be zero" }))
            return false
        }
        return true
    }, [])
    const caculate = (data: Form): Form => {
        let valid = true
        for (const key in errors) {
            const value = data[key];
            if (key == "customTip" || key == "tip") {
                if (!data["customTip"] && !data["tip"]) valid = false
            } else {
                if (!value) valid = false
            }
        }
        if (!valid) return data
        const tip = parseFloat(data.tip || data.customTip || "0")
        const totalTip = parseFloat(data.bill) * tip / 100
        const eachTip = totalTip / parseInt(data.people)
        const eachPay = parseFloat(data.bill) + totalTip / parseInt(data.people)
        return { ...data, eachTip: eachTip, eachPay: eachPay }
    }
    const handleChange = (value: string, name: string) => {
        if (name === "customTip") {
            setData((data) => ({ ...data, tip: "", customTip: value }));
        } else if (name === "tip") {
            setData((data) => ({ ...data, customTip: "", tip: value }));
        } else {
            setData((data) => ({ ...data, [name]: value }));
        }
        if (!validate(name, value)) return
        setErrors((errors) => ({ ...errors, [name as keyof Form]: "" }))
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => { setData((form) => caculate(form)) }, 300)
    }
    const reset = () => {
        setData(initData)
    }
    return { data, errors, handleChange, reset }
}
export default function TipForm(): React.JSX.Element {
    const { data, errors, handleChange, reset } = useForm()
    return <>
        <div className="flex-1">
            <img src={logo} alt="logo" className="w-[5.5rem] h-14 object-cover mx-auto" />
            <div className="container mt-24 rounded-3xl mb:max-w-none bg-white p-8 flex gap-12 justify-start items-center w-3/5 mx-auto">
                <div className="w-1/2 flex flex-col gap-10">
                    <Input onChange={handleChange} label="Bill" icon={dollar} name="bill" placeHolder="0.00" type="1" value={data.bill} error={errors.bill} />
                    <fieldset>
                        <legend className="font-bold text-base text-[var(--dark-grayish-cyan)]">Select tip %</legend>
                        <div className="flex flex-wrap items-center justify-start gap-3">
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onClick={handleChange} name="tip" type="2" value="5%" touched={"5" == data.tip} />
                            </div>
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onClick={handleChange} name="tip" type="2" value="10%" touched={"10" == data.tip} />
                            </div>
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onClick={handleChange} name="tip" type="2" value="15%" touched={"15" == data.tip} />
                            </div>
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onClick={handleChange} name="tip" type="2" value="25%" touched={"25" == data.tip} />
                            </div>
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onClick={handleChange} name="tip" type="2" value="50%" touched={"50" == data.tip} />
                            </div>
                            <div className="w-[calc(100%/3-8px)]">
                                <Input onChange={handleChange} onClick={handleChange} name="customTip" placeHolder="Custom" type="1" value={data.customTip} />
                            </div>
                        </div>
                    </fieldset>
                    <Input onChange={handleChange} name="people" placeHolder="1" icon={person} error={errors.people} type="1" label="Number of People" value={data.people} />

                </div>
                <div className="w-1/2 bg-[var(--very-dark-cyan)] rounded-2xl p-10 flex flex-col gap-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-base text-white">Tip Amount</h2>
                            <span className="font-bold text-[0.75rem] text-[var(--grayish-cyan)] italic">/ person</span>
                        </div>
                        <span className="font-bold text-[3rem] text-[var(--strong-cyan)]">${data.eachTip}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="font-bold text-base text-white">Total</h2>
                            <span className="font-bold text-[0.75rem] text-[var(--grayish-cyan)] italic">/ person</span>
                        </div>
                        <span className="font-bold text-[3rem] text-[var(--strong-cyan)]">${data.eachPay}</span>
                    </div>
                    <button onClick={reset} className="bg-[var(--strong-cyan)] rounded-md font-bold text-[1.25rem] w-full py-2 
                    text-[var(--very-dark-cyan)] hover:bg-[var(--strong-cyan)]/20 uppercase">Reset</button>
                </div>
            </div>
        </div>

    </>
}