///<reference path='styled-components/typings/styled-components.d.ts' />

/* Import singletons */
import css from './css'
import flatten from 'styled-components/lib/utils/flatten'
import stringifyRules from 'styled-components/lib/utils/stringifyRules'
import generateAlphabeticName from 'styled-components/lib/utils/generateAlphabeticName'
import ServerStyleSheet from 'styled-components/lib/models/ServerStyleSheet'
import StyleSheetManager from 'styled-components/lib/models/StyleSheetManager'

/* Import singleton constructors */
import _StyledComponent from 'styled-components/lib/models/StyledComponent'
import _ComponentStyle from 'styled-components/lib/models/ComponentStyle'
import _styled from 'styled-components/lib/constructors/styled'
import _keyframes from 'styled-components/lib/constructors/keyframes'
import _injectGlobal from 'styled-components/lib/constructors/injectGlobal'
import _constructWithOptions from 'styled-components/lib/constructors/constructWithOptions'

/* Import components */
import ThemeProvider from 'styled-components/lib/models/ThemeProvider'

/* Import Higher Order Components */
import withTheme from 'styled-components/lib/hoc/withTheme'

/* Instantiate singletons */
const ComponentStyle = _ComponentStyle(generateAlphabeticName, flatten, stringifyRules)
const constructWithOptions = _constructWithOptions(css)
const StyledComponent = _StyledComponent(ComponentStyle, constructWithOptions)

/* Instantiate exported singletons */
const keyframes = _keyframes(generateAlphabeticName, stringifyRules, css)
const injectGlobal = _injectGlobal(stringifyRules, css)
const styled = _styled(StyledComponent, constructWithOptions)

/* Export everything */
export default styled

export {
  css,
  keyframes,
  injectGlobal,
  ThemeProvider,
  withTheme,
  ServerStyleSheet,
  StyleSheetManager,
}
