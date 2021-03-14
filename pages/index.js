import Table from '../components/Table'
import { createGlobalStyle } from 'styled-components'
import{ GetDataOperator } from '../lib/hooks'

const GlobalStyle = createGlobalStyle`
    html {
        font-family: 'Roboto', sans-serif;
    }
    h2 {
        margin: 0 0 11px;
    }
`;

export default function Index() {
    return (
        <GetDataOperator>
            <div>
                <GlobalStyle />
                <Table />
            </div>
        </GetDataOperator>
    )
}