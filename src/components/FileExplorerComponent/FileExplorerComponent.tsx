import * as React from 'react'
import * as Types from './FileExplorerComponent.types.ts'
import * as _ from 'lodash-es'
import * as Components from './FileExplorerComponent.styled.ts'
import ExpandableTreeComponent from '../ExpandableTreeComponent/ExpandableTreeComponent.tsx'
import FilesListComponent from '../FilesListComponent/FilesListComponent.tsx'

const FileExplorerComponent = (props: Types.FileExplorerComponentPropsType) => {
  const collection = _.get(props, 'collection', [])
  const [selectedFolderId, setSelectedFolderId] = React.useState<number>(0);

  const handleFolderSelect = (id: number) => {
    setSelectedFolderId(id)
  }

  return (
    <Components.Root>
      <Components.LeftPanel>
        <ExpandableTreeComponent collection={collection} onSelect={handleFolderSelect} />
      </Components.LeftPanel>
      <Components.RightPanel>
        {selectedFolderId
          ? (<FilesListComponent selectedFolderId={selectedFolderId} collection={collection} />)
          : 'Select folder'
        }
      </Components.RightPanel>
    </Components.Root>
  )
}

export default FileExplorerComponent