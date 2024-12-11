import { useEffect, useState } from "react"

import supabase from "@/api/supabase"
import { fetchData, fetchDataByTime, updateRowById } from "@/api/client"

export interface Row {
    id: number;
    type: string;
    name: string;
    created_at: string;
    url: string;
    other_columns: { [key: string]: string }
}

const useRealTimeData = () => {
    const [data, setData] = useState<Row[]>([])

    useEffect(() => {
        fetchData()
            .then(result => setData(result.data || []))
    }, [])

    // Real Time data update
    useEffect(() => {
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'business' },
                (payload) => {
                    console.log('Change business table received!', payload)

                    if (payload.eventType === 'UPDATE') {
                        setData(prevData => {
                            const index = prevData.findIndex(item => item.id === payload.new.id)
                            console.log('update data index', index)
                            // new data
                            if (index === -1) {
                                return [...prevData, payload.new] as Row[]
                            }

                            return prevData.map(item => (item.id == payload.new.id) ? payload.new : item) as Row[]
                        })
                    } else if (payload.eventType === 'INSERT') {
                        setData(prevData => [...prevData, payload.new] as Row[])
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channels)
        }
    }, [])

    const updateEditRow = async (editingCell: { id: number, field: string }, editValue: string) => {
        setData(prevData => {
            return prevData.map((item: Row) =>
                item.id === editingCell.id
                    ? { ...item, [editingCell.field]: editValue }
                    : item
            )
        })

        const { error } = await updateRowById(editingCell.id, { [editingCell.field]: editValue })
        if (error) {
            console.log("update obj type fail ", error)
        }
    }

    const filterData = () => {
        setData(preData => {
            return preData.filter(item => {
                return item.type ? item.type.includes('Store') : false
            })
        })
    }

    const sortData = async (direction: string) => {
        const { error, data } = await fetchDataByTime({ direction })
        if (data) {
            setData(data)
        }

        if (error) {
            console.log("sort fail", error)
        }
    }

    const fetchPageData = async (start: number, end: number) => {
        const { data, error } = await fetchData(start, end)
        if (data) {
            setData(data)
        }

        if (error) {
            console.log("fetchPageData fails: start, end", start, end)
        }
    }

    return {
        data,
        setData,
        updateEditRow,
        filterData,
        sortData,
        fetchPageData
    }
}

export default useRealTimeData