import styled from 'styled-components'

export const Root = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`

export const FilePreview = styled.div`
  outline: 1px solid blue;
  cursor: pointer;
  padding: 8px;
  margin: 8px;
`

export const File = styled.div`
  outline: 1px solid lightgrey;
`

export const CloseFile = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
`