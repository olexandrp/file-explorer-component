import styled from 'styled-components'

export const Root = styled.div`
    border: 1px solid blue;
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
`

export const LeftPanel = styled.div`
    border: 1px solid green;
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
`

export const RightPanel = styled.div`
    border: 1px solid purple;
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
`