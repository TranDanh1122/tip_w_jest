import { renderHook, act } from '@testing-library/react';
import { useForm } from "./TipForm"
import {  describe, it, expect } from 'vitest';

describe("userForm hook", () => {
    const initData = {
        bill: "",
        tip: "5",
        customTip: "",
        people: "",
        eachTip: 0,
        eachPay: 0
    }
    describe("initData", () => {
        const { result } = renderHook(() => useForm())
        expect(result.current.data).toEqual(initData)
    })

    describe("handleChange", () => {
        it("bill change", () => {
            const { result } = renderHook(() => useForm())

            act(() => {
                result.current.handleChange("100", "bill")
            })
            expect(result.current.data.bill).toEqual("100")
        })
        it("tip change", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("100", "tip")
            })
            expect(result.current.data.tip).toEqual("100")
            expect(result.current.data.customTip).toEqual("")
        })
        it("custom tip change", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("100", "customTip")
            })
            expect(result.current.data.tip).toEqual("")
            expect(result.current.data.customTip).toEqual("100")
        })
        it("people change", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("100", "customTip")
            })
            expect(result.current.data.people).toEqual("100")
        })
    })
    describe("form valid", () => {
        it("invalid bill have error", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("test", "bill")
            })
            expect(result.current.errors.bill).toEqual("Invalid value")
        })
        it("invalid people have error", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("test", "people")
            })
            expect(result.current.errors.people).toEqual("Invalid value")
        })
        it("check prevent caculate", () => {
            const { result } = renderHook(() => useForm())
            act(() => {
                result.current.handleChange("test", "people")
                result.current.handleChange("test", "bill")
            })
            expect(result.current.data.eachTip).toEqual(0)
            expect(result.current.data.eachPay).toEqual(0)
        })
    })
    describe("Caculate", () => {
        it('caculate with tip', () => {
            const { result } = renderHook(() => useForm())

            act(() => {
                result.current.handleChange('100', 'bill')
                result.current.handleChange('2', 'people')
                result.current.handleChange('10', 'tip')
            })

            expect(result.current.data.eachTip).toEqual(5)
            expect(result.current.data.eachPay).toEqual(55)
        });
        it('caculate with custom tip', () => {
            const { result } = renderHook(() => useForm())

            act(() => {
                result.current.handleChange('100', 'bill')
                result.current.handleChange('2', 'people')
                result.current.handleChange('10', 'customTip')
            });

            expect(result.current.data.eachTip).toEqual(5)
            expect(result.current.data.eachPay).toEqual(55)
        });
    })
    describe("reset", () => {
        const { result } = renderHook(() => useForm())
        act(() => {
            result.current.reset()
        })
        expect(result.current.data).toEqual(initData)
    })
})