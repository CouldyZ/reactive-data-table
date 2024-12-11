import { useEffect, useState } from "react"

import supabase from "@/api/supabase"
import {
    createCustomColumn,
    deleteCustomColumn,
    fetchCustomColumns,
    updateRowById,
    CUSTOM_TABLE
} from "@/api/client"

interface CustomColumn {
    id: number;
    enabled: boolean;
    type: string;
    name: string;
}

const useCustomColumns = () => {
    const [customColumns, setCustomColumns] = useState<CustomColumn[]>([])

    useEffect(() => {
        fetchColumns()
    }, [])

    useEffect(() => {
        const channels = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: CUSTOM_TABLE },
                (payload) => {
                    console.log('Change custom table received!', payload.new)

                    if (payload.eventType === 'UPDATE') {
                        setCustomColumns((prevData) => {
                            const index = prevData.findIndex(item => item.id === payload.new.id)

                            // new data
                            if (index === -1) {
                                return [...prevData, payload.new].filter(item => item.enabled) as CustomColumn[]
                            }

                            // update current data
                            return prevData
                                .map(item => (item.id == payload.new.id) ? payload.new : item)
                                .filter(item => item.enabled) as CustomColumn[]
                        })
                    } else if (payload.eventType === 'INSERT') {
                        setCustomColumns(
                            prevData => [...prevData, payload.new].filter(item => item.enabled) as CustomColumn[]
                        )
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channels)
        }
    }, [])

    const fetchColumns = async () => {
        const { data, error } = await fetchCustomColumns()
        if (error) {
            console.log("fetchColumns fails", error)
        } else {
            const newData = data.filter(column => column.enabled)
            setCustomColumns(newData)
        }
    }

    const deleteColumn = async (id: number) => {
        const { data, error } = await deleteCustomColumn(id)
        if (error) {
            console.log("deleteColumn fails", error)
        } else {
            console.log("deleteColumn success", data)
            fetchColumns()
        }
    }

    const updateColumn = async (item: { other_columns: any, id: number }, type: string, value: string) => {
        if (!value || value.length == 0 || value.trim().length == 0) return

        const newValue = item?.other_columns || {}
        newValue[type] = value

        const { data, error } = await updateRowById(item.id, { other_columns: newValue })
        if (error) {
            console.log("updateColumn fail", item.id, type, newValue)
        } else {
            console.log("updateColumn success", data)
        }
    }

    const addColumn = async (name: string, type: string) => {
        const { data, error } = await createCustomColumn(name, type)
        if (error) {
            console.log("addColumn fails", error)
        } else {
            console.log("addColumn success", data)
            fetchColumns()
        }
    }

    return {
        customColumns,
        deleteColumn,
        addColumn,
        updateColumn
    }
}

export default useCustomColumns