import * as React from 'react'
import * as Types from './FilesListComponent.types.ts'
import * as DataTypes from '../../data/DataTypes.ts'
import * as _ from 'lodash-es'
import * as Component from './FilesListComponent.styled.ts'

const getFileContent = (file: DataTypes.FileModelType) => {
  const fileName = _.get(file, 'name')
  const src = _.get(file, 'src')
  const content = _.get(file, 'content')
  if (src) {
    return <img src={src} alt={fileName} />
  } else if (content) {
    return <pre>{ content }</pre>
  } else {
    return null
  }
}

const FilesListComponent = (props: Types.FilesListComponentProps) => {
  const [selectedFileId, setSelectedFileId] = React.useState<number>(0)
  const selectedFolderId = _.get(props, 'selectedFolderId')
  const collection = _.get(props, 'collection')
  const result: Array<DataTypes.FileModelType> = []
  _.each(collection, (item) => {
    const itemFolderId = _.get(item, 'folder')
    if (item.type === 'file' && itemFolderId === selectedFolderId) {
      result.push(item)
    }
  })

  const handleFileSelect = (id: number) => {
    setSelectedFileId(id)
  }

  const handleFileClose = () => {
    setSelectedFileId(0)
  }

  const selectedFileModel = _.find(collection, (item) => item.id === selectedFileId) as DataTypes.FileModelType

  return (
    <Component.Root>
      {
        selectedFileId ? (
          <>
            <Component.CloseFile onClick={handleFileClose}>❌</Component.CloseFile>
            <Component.File>{getFileContent(selectedFileModel)}</Component.File>
          </>
        ) : null
      }
      {
        !selectedFileId ? result.map((item) => {
          const id = _.get(item, 'id')
          const name = _.get(item, 'name')
          return <Component.FilePreview key={id} onDoubleClick={() => handleFileSelect(id)}>{name}</Component.FilePreview>
        }): null
      }
    </Component.Root>
  )
}

export default FilesListComponent