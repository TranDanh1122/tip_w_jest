import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TipForm from "./TipForm";
import userEvent from "@testing-library/user-event";
describe("TipForm Component", () => {
    describe("Rendered", () => {
        it("basic render", () => {
            render(<TipForm />)
            expect(screen.getByLabelText("Bill")).toBeInTheDocument()
            expect(screen.getByLabelText("Number of People")).toBeInTheDocument()
        })
        it("render select tip btn", () => {
            render(<TipForm />)
            const tips = ["5%", "10%", "15%", "25%", "50%"]
            tips.forEach((text: string) => {
                expect(screen.getByDisplayValue(text)).toBeInTheDocument()
            })
        })
    })
    describe("user action", () => {
        it("input bill", () => {
            render(<TipForm />)
            const bill = screen.getByLabelText("Bill")
            fireEvent.change(bill, { target: { value: "100" } })
            expect(bill).toHaveValue("100")
        })
        it("input people", () => {
            render(<TipForm />)
            const people = screen.getByLabelText("Number of People")
            fireEvent.change(people, { target: { value: "100" } })
            expect(people).toHaveValue("100")
        })
        it("select tip", () => {
            render(<TipForm />)
            const tipButton = screen.getByDisplayValue('10%')
            fireEvent.click(tipButton)
            expect(tipButton).toHaveClass('bg-[var(--strong-cyan)]')
            expect(screen.getByPlaceholderText("Custom")).toHaveValue("")
        })
        it('custom tip input', () => {
            render(<TipForm />)
            const customTipInput = screen.getByPlaceholderText('Custom')
            fireEvent.change(customTipInput, { target: { value: '20' } })
            expect(customTipInput).toHaveValue('20')
            const tips = ["5%", "10%", "15%", "25%", "50%"]
            tips.forEach((text: string) => {
                expect(screen.getByDisplayValue(text)).not.toHaveClass('bg-[var(--strong-cyan)]')
            })
        })
    })
    describe("functional", () => {
        it("caculator", async () => {
            render(<TipForm />)
            const bill = screen.getByLabelText("Bill")
            fireEvent.change(bill, { target: { value: '100' } })
            const people = screen.getByLabelText("Number of People")
            fireEvent.change(people, { target: { value: '2' } })
            const tip = screen.getByDisplayValue("10%")
            fireEvent.click(tip)
            await waitFor(() => {
                const tipAmount = screen.getByText('$5.00');
                const totalAmount = screen.getByText('$55.00');
                expect(tipAmount).toBeInTheDocument();
                expect(totalAmount).toBeInTheDocument();
            });
        })
        it("caculator with custom tip", async () => {
            render(<TipForm />)
            const bill = screen.getByLabelText("Bill")
            fireEvent.change(bill, { target: { value: '100' } })
            const people = screen.getByLabelText("Number of People")
            fireEvent.change(people, { target: { value: '2' } })
            const tip = screen.getByPlaceholderText("Custom")
            userEvent.type(tip, "10")
            await waitFor(() => {
                const tipAmount = screen.getByText('$5.00')
                const totalAmount = screen.getByText('$55.00')
                expect(tipAmount).toBeInTheDocument()
                expect(totalAmount).toBeInTheDocument()
            })
        })
    })
    describe("handle reset", () => {
        it("handle reset", () => {
            render(<TipForm />)
            const bill = screen.getByLabelText("Bill")
            fireEvent.change(bill, { target: { value: '100' } })
            const people = screen.getByLabelText("Number of People")
            fireEvent.change(people, { target: { value: '2' } })
            const tip = screen.getByPlaceholderText("Custom")
            fireEvent.change(tip, { target: { value: '10' } })
            const resetButton = screen.getByText('Reset')
            fireEvent.click(resetButton)
            expect(bill).toHaveValue('')
            expect(people).toHaveValue('')
            screen.getAllByText('$0.00').forEach(el => {
                expect(el).toBeInTheDocument()
            })
        })
    })
    describe('Error Handling', () => {
        it('shows error for invalid bill input', () => {
            render(<TipForm />)
            const bill = screen.getByLabelText('Bill')
            fireEvent.change(bill, { target: { value: 'abc' } })
            expect(screen.getByText('Invalid value')).toBeInTheDocument()
        })

        it('prevents calculation with incomplete inputs', () => {
            render(<TipForm />)
            const bill = screen.getByLabelText('Bill')
            fireEvent.change(bill, { target: { value: '100' } })
            screen.getAllByText('$0.00').forEach(el => {
                expect(el).toBeInTheDocument()
            })
        })
    })
})