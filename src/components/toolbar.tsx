import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { getUserConfig, updateUserConfig, timePeriodOptions, regionOptions } from 'src/util/userConfig'
import Dropdown from './dropown'

const numResultsOptions = Array.from({ length: 10 }, (_, i) => i + 1).map((num) => ({
    value: num,
    label: `${num} result${num === 1 ? '' : 's'}`
}))

function useUserConfig() {
    const [webAccess, setWebAccess] = useState(true)
    const [numResults, setNumResults] = useState(3)
    const [timePeriod, setTimePeriod] = useState('')
    const [region, setRegion] = useState('wt-wt')

    useEffect(() => {
        getUserConfig().then((userConfig) => {
            setWebAccess(userConfig.webAccess)
            setNumResults(userConfig.numWebResults)
            setTimePeriod(userConfig.timePeriod)
            setRegion(userConfig.region)
        })
    }, [])

    return {
        webAccess,
        setWebAccess,
        numResults,
        setNumResults,
        timePeriod,
        setTimePeriod,
        region,
        setRegion
    }
}

function Toolbar() {
    const { webAccess, setWebAccess, numResults, setNumResults, timePeriod, setTimePeriod, region, setRegion } = useUserConfig()

    const handleWebAccessToggle = useCallback(() => {
        setWebAccess(!webAccess)
        updateUserConfig({ webAccess: !webAccess })
    }, [webAccess])

    const handleNumResultsChange = useCallback((e: { target: { value: string } }) => {
        const value = parseInt(e.target.value)
        setNumResults(value)
        updateUserConfig({ numWebResults: value })
    }, [numResults])

    const handleTimePeriodChange = useCallback((e: { target: { value: string } }) => {
        setTimePeriod(e.target.value)
        updateUserConfig({ timePeriod: e.target.value })
    }, [timePeriod])

    const handleRegionChange = useCallback((e: { target: { value: string } }) => {
        setRegion(e.target.value)
        updateUserConfig({ region: e.target.value })
    }, [region])

    return (
        <div className="wcg-toolbar wcg-flex wcg-items-center wcg-gap-3 wcg-mt-0 wcg-p-0 wcg-px-2 dark:bg-gray-800 wcg-bg-white wcg-rounded-md">
            <label class="wcg-toggle wcg-relative wcg-inline-flex wcg-items-center wcg-cursor-pointer">
                <input type="checkbox" value="" class="wcg-sr-only wcg-peer" checked={webAccess} onChange={handleWebAccessToggle} />
                <div class="wcg-w-9 wcg-h-5 wcg-bg-gray-500 wcg-rounded-full wcg-peer dark:wcg-bg-gray-704 peer-checked:after:wcg-translate-x-full peer-checked:after:wcg-border-white after:wcg-content-[''] after:wcg-absolute after:wcg-top-[2px] after:wcg-left-[2px] after:wcg-bg-white after:wcg-border-gray-300 after:wcg-border after:wcg-rounded-full after:wcg-h-4 after:wcg-w-4 after:wcg-transition-all dark:wcg-border-gray-600 peer-checked:wcg-bg-emerald-700" />
                <span className="wcg-toggle-label wcg-ml-1 wcg-text-sm md:after:wcg-content-['Search_on_the_web'] after:wcg-content-['Web']" />
            </label>
            <Dropdown
                value={numResults}
                onChange={handleNumResultsChange}
                options={numResultsOptions}
            />
            <Dropdown
                value={timePeriod}
                onChange={handleTimePeriodChange}
                options={timePeriodOptions}
            />

            <Dropdown
                value={region}
                onChange={handleRegionChange}
                options={regionOptions}
            />

        </div>
    )
}

export default Toolbar