import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
	html {
    box-sizing: border-box;
	}
	
	*, *::before, *::after {
    box-sizing: inherit;
	}

	html, body {
    height: 100%;
	}
	
	body {
    padding: 20px;
	}
`

export default GlobalStyles

export const CELL_SIZE = "15px";
