import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import Input from "../Input";
import '@testing-library/jest-dom';
describe("Input Component", () => {
    const mockProps = (overrides = {}) => ({
        name: "testInput",
        value: "",
        ...overrides
    })
    describe("rendering", () => {
        it("have label", () => {
            const props = mockProps({ label: "Test Label" })
            render(<Input {...props} />)
            expect(screen.getByLabelText("Test Label")).toBeInTheDocument()
        })
        it("have placeHolder", () => {
            const props = mockProps({ placeHolder: "test placeHolder" })
            render(<Input {...props} />)
            expect(screen.getByPlaceholderText("test placeHolder")).toBeInTheDocument()
        })
        it("have type 1", () => {
            const props = mockProps({ type: 1, value: 123 })
            render(<Input {...props} />)
            expect(screen.getByDisplayValue(123)).toHaveClass("bg-[var(--very-light-grayish-cyan)] text-[var(--very-dark-cyan)] text-right px-8")
        })
        it("have type 2", () => {
            const props = mockProps({ type: 2, value: 10 })
            render(<Input {...props} />)
            const input = screen.getByDisplayValue(10)
            expect(input).toHaveClass("text-center")
            expect(input).toHaveAttribute("readonly")
        })
        it("have error", () => {
            const props = mockProps({ error: "Invalid value" })
            render(<Input {...props} />)
            expect(screen.getByText("Invalid value")).toBeInTheDocument()
        })
        it("have type 1 and error", () => {
            const props = mockProps({ type: 1, error: "Invalid value", value: "10" })
            render(<Input {...props} />)
            expect(screen.getByDisplayValue("10")).toBeInTheDocument()
            expect(screen.getByDisplayValue("10")).toHaveClass("focus:border-red-400 border-red-400 ")
        })
        it("have type 2 and touched", () => {
            const props = mockProps({ type: 2, touched: true, value: "10" })
            render(<Input {...props} />)
            expect(screen.getByDisplayValue("10")).toBeInTheDocument()
            expect(screen.getByDisplayValue("10")).toHaveClass("text-[var(--very-dark-cyan)] bg-[var(--strong-cyan)]")
        })
        it("have type 2 and untouched", () => {
            const props = mockProps({ type: 2, touched: false, value: "10" })
            render(<Input {...props} />)
            expect(screen.getByDisplayValue('10')).toBeInTheDocument()
            expect(screen.getByDisplayValue('10')).toHaveClass("bg-[var(--very-dark-cyan)] text-white")
        })
        it("have icon", () => {
            const props = mockProps({ type: 1, icon: "/vite.svg" })
            render(<Input {...props} />)
            const iTag = screen.getByRole("icon")
            expect(iTag).toBeInTheDocument()
            expect(iTag).toHaveClass("block")
            expect(iTag).toHaveAttribute("style", expect.stringContaining("mask"))
        })
    })
    describe("eventing", () => {
        it("onChange", () => {
            const onChange = jest.fn()
            const props = mockProps({ onChange: onChange, type: "1", value: "10" })
            render(<Input {...props} />)
            const input = screen.getByDisplayValue("10")
            fireEvent.change(input)
            expect(onChange).toHaveBeenCalledWith("10", "testInput")
        })
        it("onClick", () => {
            const onClick = jest.fn()
            const props = mockProps({ type: 2, value: "10", onClick: onClick })
            render(<Input {...props} />)
            const input = screen.getByDisplayValue("10")
            fireEvent.click(input)
            expect(onClick).toHaveBeenCalledWith("10", "testInput")
        })
    })
})