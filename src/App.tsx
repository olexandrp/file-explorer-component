import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'
import mockedData from './data/mockedData.json';
import FileExplorerComponent from './components/FileExplorerComponent/FileExplorerComponent.tsx';
import * as DataTypes from './data/DataTypes.ts'

const store = new Store(mockedData as { data: DataTypes.FoldersFilesCollectionType })

function App() {
  const collection = useStore(store, (state) => state['data']);

  return (
    <FileExplorerComponent collection={collection} />
  );
}

export default App;