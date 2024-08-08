import * as DataTypes from '../../data/DataTypes.ts'

export type FileExplorerComponentPropsType = {
  collection: DataTypes.FoldersFilesCollectionType;
  onSelect: (id: number) => void;
}