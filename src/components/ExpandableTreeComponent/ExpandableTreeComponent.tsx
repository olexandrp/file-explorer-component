import * as React from 'react'
import * as Types from '../FileExplorerComponent/FileExplorerComponent.types.ts'
import * as _ from 'lodash-es'
import * as DataTypes from '../../data/DataTypes.ts'
import * as Component from './ExpandableTreeComponent.styled.ts'

const ExpandableTreeComponent = (props: Types.FileExplorerComponentPropsType) => {
  const collection = _.get(props, 'collection', [])
  const [openItems, setOpenItems] = React.useState<Array<number>>([])
  const [selected, setSelected] = React.useState<number>(0)

  const getFilteredCollection = (): DataTypes.FoldersFilesCollectionType => {
    return _.filter(collection, (item) => {
      const itemFolder = _.get(item, 'folder')
      if (itemFolder) {
        return _.includes(openItems, itemFolder)
      } else {
        return true
      }
    })
  }

  const getItemGapSize = (id: number) => {
    const targetItem = _.find(collection, item => item.id === id)
    if (!targetItem) {
      return 0
    }
    const result: DataTypes.FoldersFilesCollectionType = []
    const getItemPath = (item: DataTypes.FileModelType | DataTypes.FolderModelType, result: DataTypes.FoldersFilesCollectionType = []) => {
      result.push(item)
      const parentItemId = _.get(item, 'folder')
      const parentItem = _.find(collection, item => item.id === parentItemId)
      if (parentItemId && parentItem) {
        getItemPath(parentItem, result)
      } else {
        return result
      }
    }
    getItemPath(targetItem, result)
    return _.size(result)
  }

  const isHasSubfolders = (id: number) => {
    return _.findIndex(collection, (item) => {
      const itemType = _.get(item, 'type')
      const itemFolderId = _.get(item, 'folder')
      return itemType === 'folder' && itemFolderId === id
    }) !== -1
  }

  const handleListItemClick = (id: number, event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const eventDetail = _.get(event, 'detail')
    if (eventDetail === 1) {
      setOpenItems((prevState) => {
        if (_.includes(prevState, id)) {
          return _.without(prevState, id)
        } else {
          return [...prevState, id]
        }
      })
    } else if (eventDetail === 2) {
      setSelected(id)
      const onSelect = _.get(props, 'onSelect')
      if (!onSelect) {
        return
      }
      try {
        onSelect(id)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const filteredCollection = getFilteredCollection()

  return (
    <Component.Root>
      {
        filteredCollection.map((item: DataTypes.FileModelType | DataTypes.FolderModelType, index) => {
          const type = _.get(item, 'type', '')
          if (type === 'folder') {
            const id = _.get(item, 'id', index)
            const name = _.get(item, 'name', '')
            const isOpen = _.includes(openItems, id)
            const gapSize = getItemGapSize(id)
            const hasSubfolders = isHasSubfolders(id)
            const isSelected = id === selected
            return (
              <Component.ListItem
                key={id}
                $isOpen={isOpen}
                $gapSize={gapSize}
                $hasSubfolders={hasSubfolders}
                $selected={isSelected}
                onClick={(event) => handleListItemClick(id, event)}
              >{name}</Component.ListItem>
            )
          }
        })
      }
    </Component.Root>
  )
}

export default ExpandableTreeComponent