import React from "react";
import clsx from "clsx";
interface InputProps {
    label?: string,
    name: string,
    value: string,
    placeHolder?: string,
    type?: string,
    error?: string,
    icon?: string,
    touched?: boolean,
    onChange?: (value: string, name: string) => void
    onClick?: (value: string, name: string) => void
}
const Input = React.memo(({ label, value, name, placeHolder, error, icon, onChange, type, onClick, touched }: InputProps): React.JSX.Element => {

    return <fieldset className="flex flex-col gap-2">
        <div className="flex justify-between items-center font-bold text-base">
            {<label htmlFor={name} className="text-[var(--dark-grayish-cyan)]">{label}</label>}
            {error && <span className="text-red-400">{error}</span>}
        </div>
        <div className="w-full relative">
            <input onClick={(e) => onClick?.((e.target as HTMLInputElement).value.replace("%" , ""), name)}
                readOnly={type == "2" ? true : false} onChange={e => onChange?.(e.target.value, name)}
                type="text" name={name} placeholder={placeHolder}
                value={value}
                className={clsx(`cursor-pointer rounded-lg border-solid border-2  outline-none w-full py-1 font-bold text-[1.5rem] `, {
                    "focus:border-[var(--strong-cyan)]  border-transparent": !error && type == "1",
                    "focus:border-red-400 border-red-400 ": error && type == "1",
                    "bg-[var(--very-light-grayish-cyan)] text-[var(--very-dark-cyan)] text-right px-8": type == "1",
                    "text-center": type == "2",
                    "bg-[var(--very-dark-cyan)] text-white": !touched && type == "2",
                    "text-[var(--very-dark-cyan)] bg-[var(--strong-cyan)]": touched && type == "2"
                })} />
            <i className="block w-[10px] h-4 absolute top-[50%] translate-y-[-50%] left-[calc(2rem-10px)] bg-[var(--grayish-cyan)]" style={{
                mask: `url("${icon}") center/cover no-repeat`,
                WebkitMask: `url("${icon}") center/cover no-repeat`,
            }}></i>
        </div>

    </fieldset>
})
export default Input