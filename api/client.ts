import supabase from './supabase';

export const MAIN_TABLE = 'business'
export const CUSTOM_TABLE = 'custom'

/**
 * fetch data
 * @param {*} from  — The starting index from which to limit the result
 * @param {*} to — The last index to which to limit the result
 * @returns promise with result and error
 */
export const fetchData = (from = 0, to = 9) => supabase
    .from(MAIN_TABLE)
    .select('*')
    .range(from, to)
    .order('id')

/**
 * fetch data order by time
 * @param {*} from  — The starting index from which to limit the result
 * @param {*} to — The last index to which to limit the result
 * @param {*} direction — The sorting direction ('asc' or 'desc')
 * @returns promise with result and error
 */
export const fetchDataByTime = ({ from = 0, to = 9, direction = 'asc' }) => supabase
    .from(MAIN_TABLE)
    .select('*')
    .range(from, to)
    .order('created_at', { ascending: direction === 'asc' })

/**
 * 
 * @param id  - item id
 * @param value - update value
 * @returns promise with result and error
 */
export const updateRowById = (id: number, value: any) => supabase
    .from(MAIN_TABLE)
    .update(value)
    .eq('id', id)

/**
 * fetch all custom column keys (range: 0 - 100)
 * @returns all custom colunms key + type
 */
export const fetchCustomColumns = () => supabase
    .from(CUSTOM_TABLE)
    .select('*')
    .range(0, 100)
    .order('id')

/**
 * 
 * @param name custom colunm name
 * @param type custom colunm type
 * @returns promise with result and error
 */
export const createCustomColumn = (name: string, type: string) => supabase
    .from(CUSTOM_TABLE)
    .insert({ name, type })
    .select()

/**
 *  delete custom column key, here we just hide it
 * @param id delete custom colunm id
 * @returns promise with result and error
 */
export const deleteCustomColumn = (id: number) => supabase
    .from(CUSTOM_TABLE)
    .update({ enabled: false })
    .eq('id', id)


export const subscribeChannel = () => supabase.channel('custom-all-channel')
    
