import styled from 'styled-components'

export const Root = styled.ul`
  padding-left: 16px;
`

export type ListItemPropsType = {
    $isOpen: boolean,
    $gapSize: number,
    $hasSubfolders: boolean,
    $selected: boolean
}

export const ListItem = styled.li<ListItemPropsType>`
    cursor: pointer;
    list-style: none;
    padding-left: ${({ $gapSize }) => $gapSize > 1 ? `${$gapSize * 8}` : 0}px;
    background-color: ${({ $selected }) => ($selected ? 'aliceblue' : 'transparent')};
    
    &:before {
        content: '▶';
        visibility: ${({ $hasSubfolders }) => ($hasSubfolders ? 'visible' : 'hidden')};
        display: inline-block;
        padding: 8px;
        ${({ $isOpen }) => ($isOpen && 'transform: rotate(90deg);')}
    }
    
    &:hover {
        background-color: bisque;
    }
`