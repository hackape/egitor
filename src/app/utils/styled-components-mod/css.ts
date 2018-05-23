import flatten from 'styled-components/lib/utils/flatten'
import interleave from 'styled-components/lib/utils/interleave'

const varRegExp = /\$[a-zA-Z\-\_0-9]+/g
const var2Function = ($var: string) => props => props.theme[$var.slice(1)]
const transfromDollarStr: (s: string) => any[] = (str: string) => {
    const matched = str.match(varRegExp)
    if (!matched) {
        return str
    }
    return interleave(str.split(varRegExp), matched.map(var2Function))
}

const remUnitRegExp = /([\s\:])(\.?\d+(?:\.\d+)?)rem\b/g
const transformRemUnit = (str: string) => {
    return str.replace(remUnitRegExp, (all, colonOrSpace, number) => `${colonOrSpace}${Number(number) * 8}px`)
}

const transform: (s: string) => any[] = (str: string) => {
    return transfromDollarStr(transformRemUnit(str))
}

const css = (strings: string[], ...interpolations: any[]) => flatten(interleave(strings.map(transform), interpolations))

export default css
